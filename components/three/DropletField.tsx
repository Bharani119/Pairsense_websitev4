"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Compact hero droplet used inside process cards. A small distorted
 * sphere that slowly rotates with a shader-lit sheen.
 */
const vert = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  varying vec3 vNormal;
  varying vec3 vPos;

  float hash(vec3 p){ return fract(sin(dot(p,vec3(12.9898,78.233,37.719)))*43758.5453); }
  float noise(vec3 p){
    vec3 i=floor(p); vec3 f=fract(p);
    f = f*f*(3.0-2.0*f);
    float n000=hash(i);
    float n100=hash(i+vec3(1,0,0));
    float n010=hash(i+vec3(0,1,0));
    float n110=hash(i+vec3(1,1,0));
    float n001=hash(i+vec3(0,0,1));
    float n101=hash(i+vec3(1,0,1));
    float n011=hash(i+vec3(0,1,1));
    float n111=hash(i+vec3(1,1,1));
    float nx00=mix(n000,n100,f.x);
    float nx10=mix(n010,n110,f.x);
    float nx01=mix(n001,n101,f.x);
    float nx11=mix(n011,n111,f.x);
    float nxy0=mix(nx00,nx10,f.y);
    float nxy1=mix(nx01,nx11,f.y);
    return mix(nxy0,nxy1,f.z);
  }

  void main(){
    vec3 p = position;
    float n = noise(p*1.6 + uTime*0.25);
    p += normal * (n - 0.5) * uAmp;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(p,1.0);
    vPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const frag = /* glsl */ `
  precision highp float;
  varying vec3 vNormal;
  varying vec3 vPos;
  uniform vec3 uCol;
  uniform vec3 uHi;
  void main(){
    vec3 L = normalize(vec3(0.4, 0.8, 0.6));
    float d = max(dot(vNormal, L), 0.0);
    float rim = pow(1.0 - max(dot(vNormal, normalize(-vPos)), 0.0), 2.0);
    vec3 col = mix(uCol*0.4, uCol, d) + uHi*rim*0.8;
    gl_FragColor = vec4(col, 1.0);
  }
`;

function Droplet({ color = "#0f2e22", highlight = "#b08b4f", amp = 0.18 }: { color?: string; highlight?: string; amp?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: amp },
      uCol: { value: new THREE.Color(color) },
      uHi: { value: new THREE.Color(highlight) },
    }),
    [color, highlight, amp]
  );
  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.y = clock.elapsedTime * 0.25;
      mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.4) * 0.3;
    }
  });
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial uniforms={uniforms} vertexShader={vert} fragmentShader={frag} />
    </mesh>
  );
}

export default function DropletField({
  color,
  highlight,
  amp,
}: {
  color?: string;
  highlight?: string;
  amp?: number;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 3], fov: 35 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Droplet color={color} highlight={highlight} amp={amp} />
    </Canvas>
  );
}
