import React from 'react'
import { createPortal } from 'react-dom';
interface ModalProps {
    isOpen: boolean;
    onClose: ()=> void;
    children: React.ReactNode;
}
const Modal:React.FC<ModalProps> = ({isOpen, onClose, children}) => {
    if(!isOpen) return null;
  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
        <div className='absolute inset-0' onClick={onClose}/>
            <div className='relative z-10 bg-white rounded-xl shadow-xl w-full max-w-md mx-4'
                onClick={(e) =>e.stopPropagation}
            >
                {children}
            </div>
        </div>,
        document.body

  )
}

export default Modal