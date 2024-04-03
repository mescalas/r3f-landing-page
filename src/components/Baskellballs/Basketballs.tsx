import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { Mesh } from "three";
import { useGLTF, Environment } from "@react-three/drei";
import {
  EffectComposer,
  DepthOfField,
  ToneMapping,
} from "@react-three/postprocessing";

function Basketball({
  z,
  index,
  speed,
}: {
  z: number;
  index: number;
  speed: number;
}) {
  const meshRef = useRef<Mesh>(null!);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);
  const { nodes, materials } = useGLTF("/basketball-v1-transformed.glb");

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height * 2),
    spin: THREE.MathUtils.randFloat(8, 12),
    randomX: Math.random() * Math.PI,
    randomZ: Math.random() * Math.PI,
  });

  useFrame((state, dt) => {
    if (dt < 0.1)
      meshRef.current.position.set(
        index === 0 ? 0 : data.x * width,
        (data.y += dt * speed),
        -z
      );

    // Rotate the object around
    meshRef.current.rotation.set(
      (data.randomX += dt / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.randomZ += dt / data.spin)
    );

    // If they're too far up, set them back to the bottom
    if (data.y > height * (index === 0 ? 4 : 1))
      data.y = -(height * (index === 0 ? 4 : 1));
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

export default function Basketballs({
  speed = 1,
  count = 150,
  depth = 80,
  easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2)),
}: {
  speed?: number;
  count?: number;
  depth?: number;
  easing?: (x: number) => number;
}) {
  return (
    <Canvas
      flat
      dpr={[1, 1.5]}
      gl={{ alpha: false }}
      camera={{ position: [0, 0, 10], near: 0.01, far: depth + 15, fov: 20 }}
    >
      <color attach="background" args={["#7D7C7C"]} />
      <spotLight
        position={[10, 20, 10]}
        penumbra={1}
        decay={0}
        intensity={2}
        color="orange"
      />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        {Array.from({ length: count }).map((_, i) => (
          <Basketball
            key={i}
            index={i}
            z={Math.round(easing(i / count) * depth) + 10}
            speed={speed}
          />
        ))}
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <DepthOfField
            target={[0, 0, 60]}
            focalLength={0.8}
            bokehScale={11}
            height={700}
          />
          <ToneMapping />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
