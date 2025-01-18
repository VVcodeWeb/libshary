'use client';
import Modal from '@web/components/ui/Modal';
import { useAddBookSteps } from '@web/hooks/useAddBookSteps';
import { SearchStep } from './SearchStep';
import { DetailsStep } from './DetailsStep';
import { Step, StepsProvider } from '@web/providers/StepsProvider';
import { AddBookSteps } from '@web/hooks/useAddBookSteps';
import { Section } from '@prisma/client';
export interface AddBookModalWrapperPros {
  sections: Section[];
  selectedSectionId?: string;
  children: React.ReactNode;
}

function AddBookModal() {
  const { currentStep, steps } = useAddBookSteps();
  return <Modal>{steps[currentStep].component}</Modal>;
}
export default function AddBookModalWrapper({
  sections,
  selectedSectionId,
}: AddBookModalWrapperPros) {
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
    >
      <AddBookModal />
    </StepsProvider>
  );
}
