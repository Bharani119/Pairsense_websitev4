"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Molecular particle field — points that form soft clusters,
 * slowly drifting and rotating, mouse-reactive.
 */

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { pointer } = useThree();

  const { positions, connections } = useMemo(() => {
    const count = 140; // Reduced from 260 for a cleaner look
    const pos = new Float32Array(count * 3);
    const cluster = 6;
    for (let i = 0; i < count; i++) {
      const cx = (Math.random() - 0.5) * 6;
      const cy = (Math.random() - 0.5) * 3.5;
      const cz = (Math.random() - 0.5) * 3;
      const r = Math.pow(Math.random(), 0.7) * 0.9;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = cx + r * Math.sin(p) * Math.cos(t);
      pos[i * 3 + 1] = cy + r * Math.sin(p) * Math.sin(t);
      pos[i * 3 + 2] = cz + r * Math.cos(p);
    }

    const lineSegments: number[] = [];
    const threshold = 0.42; // Reduced from 0.55 for fewer connections
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < threshold * threshold) {
          lineSegments.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
        }
      }
    }
    return {
      positions: pos,
      connections: new Float32Array(lineSegments),
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.04 + pointer.x * 0.2;
      ref.current.rotation.x = Math.sin(t * 0.1) * 0.05 + pointer.y * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.copy(ref.current!.rotation);
    }
  });

  return (
    <group>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.024}
          sizeAttenuation
          color="#c9a84c"
          transparent
          opacity={0.6} // Reduced from 0.85
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#c9a84c"
          transparent
          opacity={0.12} // Reduced from 0.18
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}



function GeometricStructures() {
  const groupRef = useRef<THREE.Group>(null);
  const mesh1 = useRef<THREE.Mesh>(null);
  const mesh2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
      groupRef.current.rotation.x = t * 0.04;
    }
    if (mesh1.current) {
      mesh1.current.rotation.x = t * 0.15;
      mesh1.current.rotation.y = t * 0.25;
    }
    if (mesh2.current) {
      mesh2.current.rotation.x = -t * 0.1;
      mesh2.current.rotation.z = t * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -1.5]}>
      {/* Inner Icosahedron */}
      <mesh ref={mesh1}>
        <icosahedronGeometry args={[2.5, 0]} />
        <meshBasicMaterial color="#c9a84c" wireframe transparent opacity={0.12} />
      </mesh>
      {/* Mid Octahedron */}
      <mesh ref={mesh2}>
        <octahedronGeometry args={[4.2, 0]} />
        <meshBasicMaterial color="#c9a84c" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

export default function MolecularField() {
  return (
    <Canvas
      dpr={1}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      frameloop="always"
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <Particles />
      <GeometricStructures />
    </Canvas>
  );
}
