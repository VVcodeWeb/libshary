'use client';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  id?: string;
}

const Modal = ({ children }: ModalProps) => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box min-h-72 max-h-[75vh] overflow-y-auto">
        <div className="max-w-md">{children}</div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default Modal;
