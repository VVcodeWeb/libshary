'use client';
import { Step, StepsProvider } from '@web/providers/StepsProvider';
import { AddShelfSteps, useAddShelfSteps } from '@web/hooks/useAddShelfSteps';
import { DetailsStep } from './DetailsStep';
import Modal from '../(ui)/Modal';

const steps: Step<AddShelfSteps>[] = [
  { label: 'details', component: <DetailsStep /> },
];

const AddShelfModal = () => {
  const { currentStep, modal_id } = useAddShelfSteps();
  return <Modal id={modal_id}>{steps[currentStep]?.component}</Modal>;
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
