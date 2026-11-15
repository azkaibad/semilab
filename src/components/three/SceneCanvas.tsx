"use client";

import { useEffect, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function CameraDistance({ distance }: { distance: number }) {
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    camera.position.setLength(distance);
    camera.updateProjectionMatrix();
  }, [camera, distance]);
  return null;
}

type Props = {
  children: ReactNode;
  /** Direction the camera looks from; its length is replaced by `distance`. */
  direction?: [number, number, number];
  distance: number;
  autoRotate?: boolean;
  label: string;
};

export function SceneCanvas({
  children,
  direction = [1, 0.7, 1.4],
  distance,
  autoRotate = false,
  label,
}: Props) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: direction, fov: 40, near: 0.1, far: 200 }}
      role="img"
      aria-label={label}
    >
      <color attach="background" args={["#0b1020"]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 6]} intensity={1.8} />
      <directionalLight position={[-6, -3, -4]} intensity={0.5} />
      <CameraDistance distance={distance} />
      {children}
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        autoRotate={autoRotate}
        autoRotateSpeed={0.9}
      />
    </Canvas>
  );
}
