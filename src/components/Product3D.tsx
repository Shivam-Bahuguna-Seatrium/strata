'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function StickPack({ isPouch = false }: { isPouch?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const width = isPouch ? 1.8 : 0.5;
  const height = isPouch ? 2.2 : 3;
  const depth = isPouch ? 0.8 : 0.15;

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        <mesh castShadow>
          <boxGeometry args={[width, height, depth]} />
          <meshPhysicalMaterial
            color={isPouch ? '#0077CC' : '#00A8D4'}
            metalness={0.15}
            roughness={0.25}
            clearcoat={1}
            clearcoatRoughness={0.08}
            envMapIntensity={1.35}
          />
        </mesh>
        {/* Coral label stripe */}
        <mesh position={[0, 0, depth / 2 + 0.001]}>
          <planeGeometry args={[width * 0.85, height * 0.32]} />
          <meshBasicMaterial color="#FF1493" transparent opacity={0.92} />
        </mesh>
        {/* White brand text accent */}
        <mesh position={[0, height * 0.16, depth / 2 + 0.002]}>
          <planeGeometry args={[width * 0.55, height * 0.07]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
        </mesh>
        {/* Aqua bottom accent */}
        <mesh position={[0, -height * 0.35, depth / 2 + 0.001]}>
          <planeGeometry args={[width * 0.85, height * 0.08]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.55} />
        </mesh>
      </group>
      
      {/* Glow ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00C8FF" transparent opacity={0.35} />
      </mesh>

      {/* Floating water orbs */}
      {[...Array(6)].map((_, i) => (
        <WaterOrb key={i} index={i} />
      ))}
    </Float>
  );
}

function WaterOrb({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const angle = (index / 6) * Math.PI * 2;
  const radius = 2 + Math.random();

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * 0.5 + index;
      ref.current.position.x = Math.cos(angle + t * 0.3) * radius;
      ref.current.position.y = Math.sin(t * 0.5) * 0.5;
      ref.current.position.z = Math.sin(angle + t * 0.3) * radius;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08 + Math.random() * 0.06, 16, 16]} />
      <MeshDistortMaterial
        color="#00C8FF"
        transparent
        opacity={0.55}
        distort={0.4}
        speed={3}
      />
    </mesh>
  );
}

interface Product3DProps {
  isPouch?: boolean;
}

export default function Product3D({ isPouch = false }: Product3DProps) {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-4, -3, 4]} color="#00C8FF" intensity={0.8} />
        <pointLight position={[4, 0, -4]} color="#FF1493" intensity={0.55} />
        <pointLight position={[0, 4, 2]} color="#38BEFF" intensity={0.4} />
        <pointLight position={[-1, 2, -2]} color="#FF8C00" intensity={0.35} />
        <StickPack isPouch={isPouch} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
