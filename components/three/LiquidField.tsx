"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Flowing liquid/scent-diffusion field. A single plane with a
 * custom shader that layers fractal noise and time to give the
 * impression of slow, viscous motion — a drop of perfume meeting
 * solvent.
 */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uInk;
  uniform vec3 uBg;
  uniform vec3 uMoss;
  uniform vec3 uGold;

  // hash/noise helpers
  float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
  float noise(vec2 p){
    vec2 i=floor(p); vec2 f=fract(p);
    float a=hash(i); float b=hash(i+vec2(1.,0.));
    float c=hash(i+vec2(0.,1.)); float d=hash(i+vec2(1.,1.));
    vec2 u=f*f*(3.-2.*f);
    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
  }
  float fbm(vec2 p){
    float v=0.; float a=0.5;
    for(int i=0;i<6;i++){ v+=a*noise(p); p*=2.03; a*=0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = uv * 2.4;
    float t = uTime * 0.08;

    // domain warping for viscous fluid feel
    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
    vec2 r = vec2(fbm(p + 2.1*q + vec2(1.7,9.2) + t*0.7),
                  fbm(p + 2.1*q + vec2(8.3,2.8) - t*0.6));
    float f = fbm(p + 3.4*r);

    // mouse ripple
    vec2 m = uMouse - vUv;
    float md = length(m);
    f += smoothstep(0.35, 0.0, md) * 0.25 * sin(md*20. - uTime*2.0);

    // color blending — cream → sage → deep ink with gold highlights
    vec3 col = mix(uBg, uMoss, smoothstep(0.35, 0.75, f));
    col = mix(col, uInk, smoothstep(0.62, 0.92, f));
    col += uGold * smoothstep(0.85, 1.0, f) * 0.35;

    // subtle vignette
    float vg = smoothstep(1.1, 0.35, length(uv - 0.5));
    col = mix(uBg, col, vg);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uInk: { value: new THREE.Color("#0f2e22") },
      uBg: { value: new THREE.Color("#f6f3ea") },
      uMoss: { value: new THREE.Color("#c5ccb6") },
      uGold: { value: new THREE.Color("#b08b4f") },
    }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (!mat.current) return;
    uniforms.uTime.value = clock.elapsedTime;
    uniforms.uMouse.value.set(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5);
  });

  return (
    <mesh>
      <planeGeometry args={[4, 4, 1, 1]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={vert}
        fragmentShader={frag}
      />
    </mesh>
  );
}

export default function LiquidField() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      orthographic
      camera={{ position: [0, 0, 2], zoom: 200 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Plane />
    </Canvas>
  );
}
