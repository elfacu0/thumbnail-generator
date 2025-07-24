"use client";

import React from "react";
import ReactModal from "react-modal";
import { Button } from "./Button";

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  isOpen,
  onClose,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={isOpen}
      style={{
        overlay: {
          backgroundColor: "rgba(30, 41, 59, 0.6)",
          zIndex: 100,
          backdropFilter: "blur(2px)",
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "1rem",
          padding: "2rem 2.5rem",
          minWidth: "340px",
          maxWidth: "95vw",
          maxHeight: "90vh",
          boxShadow:
            "0 12px 32px rgba(30,41,59,0.18), 0 1.5px 4px rgba(0,0,0,0.08)",
          border: "none",
          background: "linear-gradient(135deg, #f8fafc 80%, #e0e7ef 100%)",
          overflow: "auto",
        },
      }}
    >
      {title && (
        <h2 className="text-xl font-bold mb-5 text-slate-800 border-b border-slate-200 pb-2">
          {title}
        </h2>
      )}
      <div className="mb-8">{children}</div>
      <div className="flex justify-end">
        <Button
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow hover:from-indigo-600 hover:to-violet-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </ReactModal>
  );
};
