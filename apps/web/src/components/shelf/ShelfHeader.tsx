'use client';
import { Shelf } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { useAddSection } from '@web/hooks/useAddSectionSteps';
import { ShelfLabel } from './ShelfLabel';
import { AddSectionModalWrapper } from '../modals/add-section/AddSectionModalWrapper';
import { Button } from '../ui/Button';

const AddSectionButton = () => {
  const t = useTranslations('common.section-modal');
  return (
    <Button className="bg-primary h-2 w-30" onClick={() => {}}>
      {t('button')}
    </Button>
  );
};
interface ShelfHeaderProps {
  shelf: Shelf;
}
export const ShelfHeader = ({ shelf }: ShelfHeaderProps) => {
  return (
    <div className="pl-6 p-2 flex items-center border-b border-primary h-header">
      <ShelfLabel shelf={shelf} editable showPrivate textClassName="prose-xl" />
      <AddSectionModalWrapper shelfId={shelf.id}>
        <AddSectionButton />
      </AddSectionModalWrapper>
      <div className="min-w-0 flex-1"></div>
    </div>
  );
};
