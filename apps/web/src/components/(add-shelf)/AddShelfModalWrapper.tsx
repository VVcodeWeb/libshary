'use client';
import { Step, StepsProvider } from '@web/providers/StepsProvider';
import { AddShelfSteps, useAddShelfSteps } from '@web/hooks/useAddShelfSteps';
import { DetailsStep } from './DetailsStep';

const steps: Step<AddShelfSteps>[] = [
  { label: 'details', component: <DetailsStep /> },
];

const AddShelfModal = () => {
  const { currentStep, modal_id } = useAddShelfSteps();
  return (
    <dialog id={modal_id} className="modal">
      <div className="modal-box overflow-auto h-full">
        <div className="max-w-md">{steps[currentStep]?.component}</div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

interface AddShelfModalWrapperProps {
  children: React.ReactNode;
}
export const AddShelfModalWrapper = ({
  children,
}: AddShelfModalWrapperProps) => {
  const modal_id = 'add_shelf_modal';

  return (
    <StepsProvider
      initialData={{
        name: '',
        privacy: 'private',
        description: '',
        modal_id,
      }}
      modal_id={modal_id}
      steps={steps}
    >
      <AddShelfModal />
      {children}
    </StepsProvider>
  );
};
