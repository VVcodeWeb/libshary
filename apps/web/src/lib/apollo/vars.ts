import { makeVar } from '@apollo/client';
import { AddBookModalProps } from '@web/components/modals/add-book/AddBookModal';
import { AddSecitonModalProps } from '@web/components/modals/add-section/AddSectionModal';

//Client state
export type ModalVar =
  | { id: 'add-shelf'; modalProps?: null }
  | { id: 'add-section'; modalProps: AddSecitonModalProps }
  | { id: 'add-book'; modalProps: AddBookModalProps };

export const modalsVar = makeVar<ModalVar[]>([]);

export type ToastVar = {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
};

export const toastsVar = makeVar<ToastVar[]>([]);
