'use client';
import { SearchStep } from './SearchStep';
import { DetailsStep } from './DetailsStep';
import { Step, StepsProvider } from '@web/providers/StepsProvider';
import { AddBookSteps, useAddBookSteps } from '@web/hooks/useAddBookSteps';
import { Section } from '@prisma/client';
import Modal from '@web/components/ui/Modal';
export interface AddBookModalWrapperPros {
  sections: Section[];
  selectedSectionId?: string;
  children: React.ReactNode;
}
export const AddBookModalWrapper = ({
  sections,
  selectedSectionId,
  children,
}: AddBookModalWrapperPros) => {
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
      {children}
    </StepsProvider>
  );
};

const AddBookModal = () => {
  const { currentStep, steps } = useAddBookSteps();
  return <Modal>{steps[currentStep].component}</Modal>;
};
