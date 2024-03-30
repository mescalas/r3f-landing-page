import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Mesh } from "three";

function Box({ z }: { z: number }) {
  const meshRef = useRef<Mesh>(null!);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
  });

  useFrame(() => {
    meshRef.current.position.set(data.x * width, (data.y += 0.1), z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshBasicMaterial color="orange" />
    </mesh>
  );
}

export default function App({ count = 100 }: { count: number }) {
  return (
    <Canvas>
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i} z={-i} />
      ))}
    </Canvas>
  );
}
