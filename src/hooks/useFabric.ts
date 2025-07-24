"use client";

import { Canvas as FabricCanvas, Textbox } from "fabric";
import { useCallback, useEffect, useRef } from "react";

export function useFabric() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<FabricCanvas | null>(null);
  const fontSize = 24;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const fabricCanvas = fabricCanvasRef.current;
        if (fabricCanvas && fabricCanvas.getActiveObject()) {
          fabricCanvas.discardActiveObject();
          fabricCanvas.requestRenderAll();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const createTextbox = (text: string, options = {}) => {
    return new Textbox(text, {
      left: 100,
      top: 100,
      fill: "black",
      fontSize,
      backgroundColor: "rgba(138, 43, 226, 0.3)",
      textAlign: "center",
      width: 200,
      ...options,
    });
  };

  const addTextElement = useCallback(() => {
    const fabricCanvas = fabricCanvasRef.current;
    if (!fabricCanvas) return;

    const textbox = createTextbox("Write here...");
    let prevWidth = textbox.width ?? 0;
    let prevHeight = textbox.height ?? 0;

    textbox.on("scaling", () => {
      const scaleX = textbox.scaleX ?? 1;
      const scaleY = textbox.scaleY ?? 1;
      textbox.width = (textbox.width ?? 0) * scaleX;
      textbox.height = (textbox.height ?? 0) * scaleY;
      prevWidth = textbox.width;
      prevHeight = textbox.height;
    });

    textbox.on("modified", () => {
      const newWidth = textbox.width ?? 0;
      const newHeight = textbox.height ?? 0;
      if (newWidth !== prevWidth || newHeight !== prevHeight) {
        prevWidth = newWidth;
        prevHeight = newHeight;
      }
      textbox.scaleX = 1;
      textbox.scaleY = 1;
    });

    fabricCanvas.add(textbox);
  }, []);

  const addElement = () => {
    addTextElement();
  };

  const getElements = () => {
    const fabricCanvas = fabricCanvasRef.current;
    if (!fabricCanvas) return [];
    return fabricCanvas.getObjects();
  };

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new FabricCanvas(canvasRef.current, {
        width: 1280,
        height: 720,
        backgroundColor: "#fff",
      });
      fabricCanvasRef.current = fabricCanvas;

      addTextElement();
      return () => {
        fabricCanvas.dispose();
        fabricCanvasRef.current = null;
      };
    }
  }, [addTextElement]);

  return { canvasRef, addElement, getElements };
}
