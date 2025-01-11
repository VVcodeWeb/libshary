'use client';
import { SearchStep } from './SearchStep';
import { DetailsStep } from './DetailsStep';
import { Step, StepsProvider } from '@web/providers/StepsProvider';
import { AddBookSteps, useAddBookSteps } from '@web/hooks/useAddBookSteps';
import { Section } from '@prisma/client';

const AddBookModal = () => {
  const { currentStep, modal_id, steps } = useAddBookSteps();
  return (
    <dialog id={modal_id} className="modal">
      <div className="modal-box min-h-72 max-h-[75vh] overflow-y-auto">
        <div className="max-w-md">{steps[currentStep]?.component}</div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

interface AddBookModalWrapperPros {
  sections: Section[];
  selectedSectionId?: string;
  children: React.ReactNode;
}
export const AddBookModalWrapper = ({
  sections,
  selectedSectionId,
  children,
}: AddBookModalWrapperPros) => {
  const modal_id = 'add_book_modal';
  const steps: Step<AddBookSteps>[] = [
    {
      label: 'search',
      component: <SearchStep />,
    },
    {
      label: 'details',
      component: <DetailsStep />,
    },
  ];

  return (
    <StepsProvider
      initialData={{
        sections,
        selectedSectionId,
      }}
      steps={steps}
      modal_id={modal_id}
    >
      <AddBookModal />
      {children}
    </StepsProvider>
  );
};
