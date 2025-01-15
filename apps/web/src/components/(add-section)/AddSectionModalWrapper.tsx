'use client';
import { Step, StepsProvider } from '@web/providers/StepsProvider';
import { AddSectionSteps, useAddSection } from '@web/hooks/useAddSectionSteps';
import { DetailsStep } from './Details';
import Modal from '../(ui)/Modal';

const AddSectionModal = () => {
  const { currentStep, modal_id, steps } = useAddSection();
  return <Modal id={modal_id}>{steps[currentStep]?.component}</Modal>;
};

interface AddSectionModalWrapperPros {
  shelfId: string;
  children: React.ReactNode;
}
export const AddSectionModalWrapper = ({
  shelfId,
  children,
}: AddSectionModalWrapperPros) => {
  const modal_id = 'add_section_modal';
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
      modal_id={modal_id}
    >
      <AddSectionModal />
      {children}
    </StepsProvider>
  );
};
