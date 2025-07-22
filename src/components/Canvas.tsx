"use client";

import { Button } from "@/components/Button";
import { useEditor } from "@/hooks/useEditor";
import React from "react";

export const Canvas: React.FC = () => {
  const { canvasRef, addElement, convertImage } = useEditor();

  return (
    <>
      <Button onClick={addElement}>Add Rectangle</Button>
      <canvas ref={canvasRef} width={600} height={400} />
      <div className="flex flex-row gap-2">
        <Button onClick={convertImage}>Convert</Button>
      </div>
    </>
  );
};
