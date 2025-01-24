'use client';
import { useReactiveVar } from '@apollo/client';
import { LazyComponent } from '@web/components/modals/LazyComponent';
import { modalsVar } from '@web/lib/apollo/vars';

interface ModalProviderProps {
  children: React.ReactNode;
}
export function ModalProvider({ children }: ModalProviderProps) {
  const modals = useReactiveVar(modalsVar);
  const modalFiles = {
    'add-shelf': 'add-shelf/AddShelfModal',
    'add-section': 'add-section/AddSectionModal',
    'add-book': 'add-book/AddBookModal',
  } as const;
  return (
    <>
      {modals.map((modal) => (
        <LazyComponent
          key={modal.id}
          filename={modalFiles[modal.id]}
          props={modal.modalProps}
        />
      ))}
      {children}
    </>
  );
}
