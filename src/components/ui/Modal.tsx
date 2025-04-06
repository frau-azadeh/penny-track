import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="fiexed bg-black/40 inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="inset-0 absolute" />
      <div
        className="relative z-10 bg-white rounded-xl shadow-xl w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          variant="secondary"
          className="absoulute top-3 px-22 py-1 leading-none text-xl"
        >
          &times;
        </Button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
