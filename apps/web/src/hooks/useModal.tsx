import { useRef, useEffect } from 'react';

interface useModalProps {
  modal_id: string;
  onOpen?: () => void;
  onClose?: () => void;
}

export const useModal = ({ modal_id, onOpen, onClose }: useModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogEl = document.getElementById(
      modal_id,
    ) as HTMLDialogElement | null;
    dialogRef.current = dialogEl;

    if (dialogEl) {
      dialogEl.onclose = () => {
        console.log('Modal closed');
        onClose?.();
      };
    }
    return () => {
      if (dialogEl) dialogEl.onclose = null;
    };
  }, [modal_id, onClose]);

  const openModal = () => {
    const dialogEl = dialogRef.current;
    if (dialogEl) {
      onOpen?.();
      dialogEl.showModal();
    }
  };

  const closeModal = () => {
    const dialogEl = dialogRef.current;
    if (dialogEl) {
      dialogEl.close();
    }
  };

  return { openModal, closeModal };
};
