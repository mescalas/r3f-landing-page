import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Mesh } from "three";
import { useGLTF, Environment } from "@react-three/drei";

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
      (data.randomY += 0.004),
      (data.randomZ += 0.005)
    );
    meshRef.current.position.set(data.x * width, (data.y += 0.01), z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
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

export default function App({ count = 100 }: { count: number }) {
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} intensity={2} />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        {Array.from({ length: count }).map((_, i) => (
          <Basketball key={i} z={-i - 1} />
        ))}
      </Suspense>
    </Canvas>
  );
}
