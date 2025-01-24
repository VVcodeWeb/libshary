'use client';
import { Step, StepsProvider } from '@web/providers/StepsProvider';

import { DetailsStep } from './DetailsStep';
import Modal from '@libshary/ui/components/Modal';
import { useAddSection, AddSectionSteps } from '@web/hooks/useAddSectionSteps';
import { useModal } from '@web/hooks/useModal';

const AddSectionModal = () => {
  const { currentStep, steps } = useAddSection();
  const { closeModal } = useModal();
  return (
    <Modal closeModal={() => closeModal('add-section')}>
      {steps[currentStep]?.component}
    </Modal>
  );
};

export interface AddSecitonModalProps {
  shelfId: string;
}
export default function AddSectionModalWrapper({
  shelfId,
}: AddSecitonModalProps) {
  const steps: Step<AddSectionSteps>[] = [
    {
      label: 'details',
      component: <DetailsStep />,
    },
  ];

  return (
    <StepsProvider
      initialData={{
        shelfId,
      }}
      steps={steps}
    >
      <AddSectionModal />
    </StepsProvider>
  );
}
