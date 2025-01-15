'use client';
import { Shelf } from '@prisma/client';
import { ShelfItem } from './ShelfItem';
import { AddSectionModalWrapper } from '../(add-section)/AddSectionModalWrapper';
import { Button } from '../(ui)/Button';
import { useTranslations } from 'next-intl';
import { useAddSection } from '@web/hooks/useAddSectionSteps';

const AddSectionButton = () => {
  const t = useTranslations('common.section-modal');
  const { openModal } = useAddSection();
  return (
    <Button className="bg-primary h-2 w-30" onClick={openModal}>
      {t('button')}
    </Button>
  );
};
interface ShelfHeaderProps {
  shelf: Shelf;
}
export const ShelfHeader = ({ shelf }: ShelfHeaderProps) => {
  return (
    <div className="pl-6 p-2 flex items-center border-b border-primary h-12">
      <ShelfItem shelf={shelf} containerClass="flex-2" />
      <AddSectionModalWrapper shelfId={shelf.id}>
        <AddSectionButton />
      </AddSectionModalWrapper>
      <div className="min-w-0 flex-1"></div>
    </div>
  );
};
