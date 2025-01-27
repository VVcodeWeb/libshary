'use client';
import { useTranslations } from 'next-intl';
import { PlusIcon } from '@libshary/ui/icons/PlusIcon';
import { ShelvesList } from './shelves-list/ShelvesList';
import { useModal } from '@web/hooks/useModal';
import { useSuspenseQuery } from '@apollo/client';
import { ShelvesSidebar_Query } from '@web/actions/shelves/queries';
import { Suspense } from 'react';

export const Shelves = () => {
  const t = useTranslations('common.sidebar');
  const { data, error } = useSuspenseQuery(ShelvesSidebar_Query);
  const { openModal } = useModal();
  const onAddShelfClick = () => openModal({ id: 'add-shelf' });

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;
  return (
    <Suspense fallback={<div className="skeleton h-full w-full"></div>}>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center p-3">
          <article className="prose">{t('shelves')}</article>
          <PlusIcon
            className="stroke-primary w-6 cursor-pointer"
            onClick={onAddShelfClick}
          />
        </div>
        <ShelvesList shelves={data} />
      </div>
    </Suspense>
  );
};
