'use client';
import { deleteSection, updateSection } from '@web/actions/sections/mutations';
import { EllipsisIcon } from '@web/components/icons/EllipsisIcon';
import { EditableLabel } from '@web/components/form/EditableLabel';
import { useToast } from '@web/hooks/useToast';
import { cn } from '@web/lib/utils';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect, useState } from 'react';
import { Dropdown } from '@web/components/ui/Dropdown';

interface SectionLabelProps {
  id: string;
  label: string;
  editable?: boolean;
  textClassName?: string;
}
export const SectionLabel = ({
  id,
  label,
  editable,
  textClassName,
}: SectionLabelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { showErrorToast, showSuccessToast } = useToast();
  const t = useTranslations('common');
  const [updateState, updateAction] = useActionState(
    updateSection.bind(null, id),
    null,
  );
  const [deleteState, deleteAction] = useActionState(
    deleteSection.bind(null, id),
    null,
  );

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

  const onDeleteClick = async () => {
    deleteAction();
  };

  const onEditSave = async (value: string) => {
    const formData = new FormData();
    formData.set('name', value);
    updateAction(formData);
  };
  const onEditClick = () => setIsEditing(true);

  const renderLabel = () => {
    const baseLabel = (
      <article
        className={cn('prose line-clamp-1', textClassName)}
        onClick={() => editable && setIsEditing(true)}
      >
        {label}
      </article>
    );
    const withEditable = editable ? (
      <EditableLabel
        label={label}
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
    return withEditable;
  };
  const renderDropdown = () => {
    return (
      <Dropdown>
        <Dropdown.Button>
          <EllipsisIcon className="w-6 cursor-pointer" />
        </Dropdown.Button>
        <Dropdown.Menu>
          <div className="cursor-pointer" onClick={onDeleteClick}>
            {t('delete')}
          </div>
          <div className="cursor-pointer" onClick={onEditClick}>
            {t('edit')}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <div className="join join-horizontal gap-2 items-center">
      {renderLabel()}
      {renderDropdown()}
    </div>
  );
};
