"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";

type Props = {
  text: string;
  position?: [number, number, number];
  /** Height of the label in world units. */
  height?: number;
  color?: string;
  background?: string;
};

/**
 * Text drawn into a texture and shown as a camera-facing sprite. It lives
 * entirely inside the WebGL scene, so it adds no DOM nodes next to the canvas.
 */
export function TextSprite({
  text,
  position,
  height = 0.3,
  color = "#ffffff",
  background,
}: Props) {
  const { texture, aspect } = useMemo(() => {
    const fontSize = 64;
    const padding = background ? 18 : 4;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;
    const font = `700 ${fontSize}px system-ui, sans-serif`;
    context.font = font;
    canvas.width = Math.ceil(context.measureText(text).width) + padding * 2;
    canvas.height = fontSize + padding * 2;

    if (background) {
      context.fillStyle = background;
      context.beginPath();
      context.roundRect(0, 0, canvas.width, canvas.height, 16);
      context.fill();
    }
    context.font = font;
    context.fillStyle = color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2 + 4);

    const result = new THREE.CanvasTexture(canvas);
    result.colorSpace = THREE.SRGBColorSpace;
    return { texture: result, aspect: canvas.width / canvas.height };
  }, [text, color, background]);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <sprite position={position} scale={[height * aspect, height, 1]} renderOrder={10}>
      <spriteMaterial map={texture} transparent depthTest={false} />
    </sprite>
  );
}
