'use client';
import { Step, StepsProvider } from '@web/providers/StepsProvider';
import { DetailsStep } from './DetailsStep';
import Modal from '@libshary/ui/components/Modal';
import { AddShelfSteps, useAddShelfSteps } from '@web/hooks/useAddShelfSteps';
import { useModal } from '@web/hooks/useModal';

const AddShelfModal = () => {
  const { currentStep, steps } = useAddShelfSteps();
  const { closeModal } = useModal();
  return (
    <Modal closeModal={() => closeModal('add-shelf')}>
      {steps[currentStep]?.component}
    </Modal>
  );
};

export default function () {
  const steps: Step<AddShelfSteps>[] = [
    { label: 'details', component: <DetailsStep /> },
  ];
  return (
    <StepsProvider
      initialData={{
        name: '',
        privacy: 'private',
        description: '',
      }}
      steps={steps}
    >
      <AddShelfModal />
    </StepsProvider>
  );
}
