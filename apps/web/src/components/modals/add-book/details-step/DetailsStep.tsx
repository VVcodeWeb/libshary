'use client';
import { useAddBookSteps } from '@web/hooks/useAddBookSteps';
import { gql } from '@web/__generated__';
import { useMutation } from '@apollo/client';
import {
  CreateSectionBookMutation,
  CreateSectionBookMutationVariables,
} from '@web/__generated__/graphql';
import { SectionSelectionItem } from './SectionSelectionItem';
import { BookSearchItem } from '../search-step/BookSearchItem';
import { FragmentType, useFragment } from '@web/__generated__';
import { useToast } from '@web/hooks/useToast';
import { useTranslations } from 'next-intl';
import { useModal } from '@web/hooks/useModal';
import { ShelfPage_Query } from '@web/actions/shelves/queries';

export const DetailsStep_SectionsFragment = gql(`
  fragment DetailsStep_SectionsFragment on ShelfModel {
    sections {
      id 
      ...SectionSelectionItem_SectionFragment
    }
  }
`);

export const CreateSectionBook = gql(`
  mutation CreateSectionBook($createSectionBookInput: CreateSectionBookInput!) {
    createSectionBook(createSectionBookInput: $createSectionBookInput) {
      id
      sectionId
      bookId
      createdAt
      updatedAt
    }
  }
`);

interface BookDetailsStep {
  sections?: FragmentType<typeof DetailsStep_SectionsFragment> | null;
  sectionsLoading: boolean;
}

export const DetailsStep = (props: BookDetailsStep) => {
  const { data, updateData, navigateToStep } = useAddBookSteps();
  const { closeModal } = useModal();
  const t = useTranslations('common');
  const sectionsList = useFragment(
    DetailsStep_SectionsFragment,
    props.sections,
  );
  const [createSectionBook] = useMutation<
    CreateSectionBookMutation,
    CreateSectionBookMutationVariables
  >(CreateSectionBook);
  const { showErrorToast, showSuccessToast } = useToast();

  const onSubmitClick = async () => {
    await createSectionBook({
      variables: {
        createSectionBookInput: {
          sectionId: data.selectedSectionId,
          googleBookId: data.book?.googleBookId as string,
        },
      },
      onError: (error) => {
        console.error(error);
        showErrorToast(t('error'));
      },
      onCompleted: () => {
        showSuccessToast(t('success'));
        closeModal('add-book');
      },
      refetchQueries: [
        { query: ShelfPage_Query, variables: { id: data.shelfId } },
      ],
    });
  };

  const navigateBack = () => navigateToStep('search');
  const onBackClick = () => navigateBack();
  const onSectionSelect = (id: string) => updateData({ selectedSectionId: id });

  if (!data.book) {
    navigateBack();
    return <></>;
  }
  if (props.sectionsLoading || !sectionsList) {
    return <div>Loading...</div>;
  }
  {
    return (
      <div>
        <div className="flex flex-col gap-2">
          <BookSearchItem book={data.book} />
          <div className="space-y-4">
            <p>Select section</p>
            {sectionsList.sections.map((section) => (
              <SectionSelectionItem
                key={section.id}
                onSectionClick={onSectionSelect}
                selectedId={data.selectedSectionId}
                section={section}
              />
            ))}
          </div>
          <div>
            <textarea
              className="textarea textarea-primary"
              placeholder="Notes(optional)"
            ></textarea>
          </div>
          <div className="modal-action flex justify-between">
            <button className="btn" onClick={onBackClick}>
              Back
            </button>
            <button className="btn btn-primary" onClick={onSubmitClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
};
