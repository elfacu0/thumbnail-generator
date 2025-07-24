"use client";

import { Button } from "@/components/Button";
import { useEditor } from "@/hooks/useEditor";
import React, { useState } from "react";
import { Modal } from "./Modal";
import Image from "next/image";
import { useModal } from "@/hooks/useModal";

export const Canvas: React.FC = () => {
  const [imageSrc, setImageSrc] = useState("");
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const { canvasRef, addElement, generateImageFromCanvas } = useEditor();

  const convertImage = async () => {
    const imageBase64 = await generateImageFromCanvas();
    setImageSrc(imageBase64);
    handleOpenModal();
  };

  return (
    <>
      <Button onClick={addElement}>Add Rectangle</Button>
      <canvas ref={canvasRef} width={600} height={400} />
      <div className="flex flex-row gap-2">
        <Button onClick={convertImage}>Convert with IA</Button>
      </div>
      <Modal
        title="Image created with AI"
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="AI generated image"
            width={400}
            height={300}
          />
        ) : (
          <div className="text-slate-500 text-center py-8">
            No image generated yet.
          </div>
        )}
      </Modal>
    </>
  );
};
