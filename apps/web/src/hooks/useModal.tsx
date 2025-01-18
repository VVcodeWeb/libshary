import { useCallback } from 'react';

export function useModal(modalFileName: string) {
  const dispatch = () => {
    (val: any) => {};
  };

  const onOpenModal = useCallback((data?: any) => dispatch(), [modalFileName]);
  const onCloseModal = useCallback(() => dispatch(), [modalFileName]);

  const isOpen = false;

  return {
    isOpen,
    onOpenModal,
    onCloseModal,
  };
}
