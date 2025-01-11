import { useAddBookSteps } from '@web/hooks/useAddBookSteps';
import { useTranslations } from 'next-intl';
import { Button } from '../(ui)/Button';

interface SectionHeaderProps {
  name: string;
  booksCount: number;
  id: string;
}
export const SectionHeader = ({ name, id, booksCount }: SectionHeaderProps) => {
  const t = useTranslations('common');
  const { openModal, updateData } = useAddBookSteps();
  const onButtonClick = () => {
    updateData({ selectedSectionId: id });
    openModal();
  };
  return (
    <div className="join join-horizontal gap-2 items-center my-4">
      <div>
        <article className="prose-2xl">{name}</article>
      </div>
      <article className="prose-xl text-gray-500">{booksCount} books</article>
      <Button
        onClick={onButtonClick}
        className="btn-active text-white btn-primary"
      >
        {t('book-modal.button')}
      </Button>
    </div>
  );
};
