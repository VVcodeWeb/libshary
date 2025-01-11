'use client';
import { BookSearchItem } from './BookSearchItem';
import { useAddBookSteps } from '@web/hooks/useAddBookSteps';
import { createSectionBook } from '@web/actions/books/mutations';
import { SectionSelection } from './SectionSelection';

export const DetailsStep = () => {
  const { data, updateData, navigateToStep, closeModal } = useAddBookSteps();
  const onBackClick = () => navigateToStep('search');
  const onSubmitClick = async () => {
    const result = await createSectionBook({
      sectionId: data.selectedSectionId,
      googleBookId: data.book?.googleBookId as string,
    });
    if (result.success) {
      closeModal();
    }
  };

  const onSectionSelect = (id: string) => {
    updateData({ selectedSectionId: id });
  };
  if (!data.book) {
    navigateToStep('search');
    return <></>;
  }
  return (
    <div>
      <div className="flex flex-col gap-2">
        <BookSearchItem book={data.book} />
        <SectionSelection
          sections={data.sections}
          onSectionClick={onSectionSelect}
          selectedId={data.selectedSectionId}
        />
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
};
