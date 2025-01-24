'use client';
import { SearchStep } from './search-step/SearchStep';
import { DetailsStep } from './details-step/DetailsStep';
import { Step, StepsProvider } from '@web/providers/StepsProvider';
import Modal from '@libshary/ui/components/Modal';
import { AddBookSteps, useAddBookSteps } from '@web/hooks/useAddBookSteps';
import { useModal } from '@web/hooks/useModal';
import { gql } from '@web/__generated__';
import { useQuery } from '@apollo/client';
import {
  AddBookSections_QueryQuery,
  AddBookSections_QueryQueryVariables,
} from '@web/__generated__/graphql';

const AddBookModal = () => {
  const { currentStep, steps } = useAddBookSteps();
  const { closeModal } = useModal();
  return (
    <Modal closeModal={() => closeModal('add-book')}>
      {steps[currentStep].component}
    </Modal>
  );
};
export const AddBookSections_Query = gql(`
  query AddBookSections_Query($shelfId: String!) {
    findShelf(id: $shelfId) {
      ...DetailsStep_SectionsFragment
    }
  }
  `);
export interface AddBookModalProps {
  selectedSectionId?: string;
  shelfId: string;
}
export default function AddBookModalWrapper({
  selectedSectionId,
  shelfId,
}: AddBookModalProps) {
  const { data, loading } = useQuery<
    AddBookSections_QueryQuery,
    AddBookSections_QueryQueryVariables
  >(AddBookSections_Query, {
    variables: { shelfId },
  });
  const steps: Step<AddBookSteps>[] = [
    {
      label: 'search',
      component: <SearchStep />,
    },
    {
      label: 'details',
      component: (
        <DetailsStep sections={data?.findShelf} sectionsLoading={loading} />
      ),
    },
  ];

  return (
    <StepsProvider
      initialData={{
        selectedSectionId,
        shelfId,
      }}
      steps={steps}
    >
      <AddBookModal />
    </StepsProvider>
  );
}
