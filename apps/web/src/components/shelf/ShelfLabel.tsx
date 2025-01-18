import { useActionState, useEffect, useState } from 'react';
import { EllipsisIcon } from '../icons/EllipsisIcon';
import { useTranslations } from 'next-intl';
import { EditableLabel } from '../form/EditableLabel';
import { useToast } from '@web/hooks/useToast';
import { deleteShelf, updateShelf } from '@web/actions/shelves/mutations';
import { Shelf } from '@prisma/client';
import { LockIcon } from '../icons/LockIcon';
import { Link } from '@web/lib/i18n/routing';
import { cn } from '@web/lib/utils';
import { Dropdown } from '../ui/Dropdown';

interface ShelfLabelProps {
  shelf: Shelf;
  editable?: boolean;
  showPrivate?: boolean;
  textClassName?: string;
  withLink?: boolean;
  containerClassName?: string;
}
export const ShelfLabel = ({
  shelf,
  editable,
  showPrivate,
  withLink,
  textClassName,
  containerClassName,
}: ShelfLabelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { showErrorToast, showSuccessToast } = useToast();
  const [updateState, updateAction] = useActionState(
    updateShelf.bind(null, shelf.id),
    null,
  );
  const [deleteState, deleteAction] = useActionState(
    deleteShelf.bind(null, shelf.id),
    null,
  );
  const t = useTranslations('common');

  useEffect(() => {
    if (updateState && updateState.success) {
      showSuccessToast(t('success'));
    } else if (updateState && updateState.message) {
      showErrorToast(updateState.message);
    }
  }, [updateState]);

  useEffect(() => {
    if (deleteState && deleteState.success) {
      showSuccessToast(t('success'));
    } else if (deleteState && deleteState.message) {
      showErrorToast(deleteState.message);
    }
  }, [deleteState]);

  const onEditSave = async (value: string) => {
    const formData = new FormData();
    formData.set('name', value);
    updateAction(formData);
  };

  const onDeleteClick = async () => {
    deleteAction();
  };

  const renderLabel = () => {
    const baseLabel = (
      <article
        className={cn('prose line-clamp-1', textClassName)}
        onClick={() => editable && setIsEditing(true)}
      >
        {shelf.name}
      </article>
    );
    const withEditable = editable ? (
      <EditableLabel
        label={shelf.name}
        onSave={onEditSave}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        textClassName={cn('prose hover:bg-base-200 p-1', textClassName)}
      >
        {baseLabel}
      </EditableLabel>
    ) : (
      baseLabel
    );

    if (withLink) {
      return <Link href={`/home/shelves/${shelf.id}`}>{withEditable}</Link>;
    }
    return withEditable;
  };

  const renderDropdown = () => {
    return (
      <Dropdown>
        <Dropdown.Button>
          <EllipsisIcon className="w-6 cursor-pointer" />
        </Dropdown.Button>
        <Dropdown.Menu>
          <div className="cursor-pointer">{t('edit')}</div>
          <div className="cursor-pointer" onClick={onDeleteClick}>
            {t('delete')}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <div
      className={
        'join join-horizontal items-center justify-between ' +
        containerClassName
      }
    >
      <div className="flex items-center gap-2">
        {renderLabel()}
        {showPrivate && shelf.private && <LockIcon className="w-4 h-4" />}
      </div>
      {renderDropdown()}
    </div>
  );
};
