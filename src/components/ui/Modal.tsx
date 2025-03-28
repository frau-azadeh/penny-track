import React from 'react'
import { createPortal } from 'react-dom';
import Button from './Button';
interface ModalProps{
  isOpen: boolean;
  onClose: ()=> void;
  children: React.ReactNode;
}
const Modal:React.FC<ModalProps> = ({isOpen, onClose, children}) => {
  if(!isOpen) return null;
  return createPortal(
   <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div className='absolute inset-0' onClick={onClose}/>
        <div 
          className='relative z-10 bg-white rounded-xl shadow-xl w-full max-w-md mx-4'
          onClick={(e)=> e.stopPropagation()}
        >
            <Button
              onClick={onClose}
              variant="secondary"
              className="absolute top-3 left-3 px-2 py-1 text-xl leading-none"
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