import { ModalVar, modalsVar } from '@web/lib/apollo/vars';
import { useCallback } from 'react';

export const useModal = () => {
  const openModal = useCallback((modal: ModalVar) => {
    if (!modalsVar().some((existingModal) => existingModal.id === modal.id)) {
      modalsVar([...modalsVar(), modal]);
    }
  }, []);

  const closeModal = useCallback((id: ModalVar['id']) => {
    modalsVar(modalsVar().filter((modal) => modal.id !== id));
  }, []);

  return { openModal, closeModal };
};
