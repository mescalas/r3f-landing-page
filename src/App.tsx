import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Mesh } from "three";
import { useGLTF, Environment } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";

function Basketball({ z }: { z: number }) {
  const { nodes, materials } = useGLTF("/basketball-v1-transformed.glb");
  const meshRef = useRef<Mesh>(null!);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    randomX: Math.random() * Math.PI,
    randomY: Math.random() * Math.PI,
    randomZ: Math.random() * Math.PI,
  });

  useFrame(() => {
    meshRef.current.rotation.set(
      (data.randomX += 0.001),
      (data.randomY += 0.001),
      (data.randomZ += 0.001)
    );
    meshRef.current.position.set(data.x * width, (data.y += 0.01), z);
    if (data.y > height) data.y = -height;
  });

  return (
    <mesh
      ref={meshRef}
      scale={2}
      geometry={(nodes.defaultMaterial as THREE.Mesh).geometry}
      rotation={[Math.PI / 2, 0, Math.PI / 2]}
      material={materials.initialShadingGroup}
    />
  );
}

export default function App({
  count = 100,
  depth = 80,
}: {
  count: number;
  depth: number;
}) {
  return (
    <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30 }}>
      <color attach="background" args={["#9c380d"]} />
      <spotLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        {Array.from({ length: count }).map((_, i) => (
          <Basketball key={i} z={-(i / count) * depth - 20} />
        ))}
        <EffectComposer>
          <DepthOfField
            target={[0, 0, depth / 3]}
            focalLength={0.5}
            bokehScale={11}
            height={700}
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
