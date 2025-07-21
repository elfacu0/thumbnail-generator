"use client";

import React, { useEffect, useRef } from "react";
import { Canvas as FabricCanvas, Rect } from "fabric";
import { Button } from "@/components/Button";

export const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);

  const addRectangle = () => {
    if (fabricCanvasRef.current) {
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: "red",
        width: 100,
        height: 100,
      });
      fabricCanvasRef.current.add(rect);
    }
  };

  const addElement = () => {
    addRectangle();
  };

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new FabricCanvas(canvasRef.current, {
        width: 600,
        height: 400,
        backgroundColor: "#fff",
      });
      fabricCanvasRef.current = fabricCanvas;

      return () => {
        fabricCanvas.dispose();
        fabricCanvasRef.current = null;
      };
    }
  }, []);

  return (
    <>
      <Button onClick={addElement}>Add Rectangle</Button>
      <canvas ref={canvasRef} width={600} height={400} />
    </>
  );
};
