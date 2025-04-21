import React, { ReactNode } from 'react'
import { createPortal } from 'react-dom';
import Button from './Button';

interface ModalProps{
  isOpen: boolean;
  onClose: ()=> void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className='fixed bg-black/45 inset-0 items-center justify-center'>
      <div className='absolute inset-0' onClick={onClose}/>
      <div
        className='relative z-0 bg-white rounded-xl shadow-xl w-full max-w-md max-4'
        onClick={(e) => e.stopPropagation}
      >
          <Button
            onClick={onClose}
            className='absolute top-3 py-3 leading-none text-xl'
            variant='secondary'
          >
            &times;
          </Button>
          {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal