'use client';
import { useTranslations } from 'next-intl';
import { ShelfLabel } from './ShelfLabel';
import { Button } from '@libshary/ui/components';
import { FragmentType, gql, useFragment } from '@web/__generated__';
import { useModal } from '@web/hooks/useModal';

export const ShelfPageHeader_QueryFragment = gql(`
  fragment ShelfPageHeader_QueryFragment on ShelfModel {
    id
    name
    private
  }`);

interface ShelfHeaderProps {
  shelf: FragmentType<typeof ShelfPageHeader_QueryFragment>;
}
export const ShelfHeader = (props: ShelfHeaderProps) => {
  const shelf = useFragment(ShelfPageHeader_QueryFragment, props.shelf);
  const t = useTranslations('common.section-modal');
  const { openModal } = useModal();
  const onAddSectionClick = () => {
    openModal({
      id: 'add-section',
      modalProps: {
        shelfId: shelf.id,
      },
    });
  };
  if (!shelf) return null;

  return (
    <div className="pl-6 p-2 flex items-center border-b border-primary h-header gap-10">
      <ShelfLabel
        shelf={{
          id: shelf.id,
          name: shelf.name,
          private: shelf.private,
        }}
        editable
        showPrivate
        containerClassName="sm:min-w-48"
        textClassName="prose-xl"
      />
      <Button className="bg-primary h-2 w-30" onClick={onAddSectionClick}>
        {t('button')}
      </Button>
      <div className="min-w-0 flex-1"></div>
    </div>
  );
};
