'use client';
import { useTranslations } from 'next-intl';
import { AddShelfModalWrapper } from '../(add-shelf)/AddShelfModalWrapper';
import { ShelfWithSections } from '@bookshary/shared-types';
import { useAddShelfSteps } from '@web/hooks/useAddShelfSteps';
import { PlusIcon } from '@web/components/(icons)/PlusIcon';
import { ShelvesList } from './ShelvesList';

const AddShelfIcon = () => {
  const { openModal } = useAddShelfSteps();
  return (
    <PlusIcon
      className="stroke-primary w-6 cursor-pointer"
      onClick={openModal}
    />
  );
};

type ShelvesProps = {
  shelves: ShelfWithSections[];
};
export const Shelves = ({ shelves }: ShelvesProps) => {
  const t = useTranslations('common.sidebar');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-primary h-12 p-2">
        <article className="prose">{t('shelves')}</article>
        <AddShelfModalWrapper>
          <AddShelfIcon />
        </AddShelfModalWrapper>
      </div>
      <ShelvesList shelves={shelves} />
    </div>
  );
};
