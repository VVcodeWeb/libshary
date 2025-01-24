'use client';
import { EllipsisIcon } from '@libshary/ui/icons/EllipsisIcon';
import { cn } from '@libshary/ui/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { EditableLabel } from '@libshary/ui/form';
import { Dropdown } from '@libshary/ui/components';
import { useMutation } from '@apollo/client';
import {
  RemoveSectionMutation,
  RemoveSectionMutationVariables,
  UpdateSectionMutation,
  UpdateSectionMutationVariables,
} from '@web/__generated__/graphql';
import { useToast } from '@web/hooks/useToast';
import { ShelvesSidebar_Query } from '@web/actions/shelves/queries';
import { gql } from '@web/__generated__';
export const UpdateSection = gql(`
  mutation UpdateSection($id: String!, $updateSectionInput: UpdateSectionInput!) {
    updateSection(id: $id, updateSectionInput: $updateSectionInput) {
      id
      name
    }
  }
`);

export const RemoveSection = gql(`
  mutation RemoveSection($id: String!) {
    removeSection(id: $id) {
      id
    }
  }
`);
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

  const [updateSection] = useMutation<
    UpdateSectionMutation,
    UpdateSectionMutationVariables
  >(UpdateSection);

  const [deleteSection] = useMutation<
    RemoveSectionMutation,
    RemoveSectionMutationVariables
  >(RemoveSection);

  const onEditClick = () => setIsEditing(true);

  const onEditSave = async (value: string) => {
    if (!value) {
      showErrorToast('Validation error');
      return;
    }
    await updateSection({
      variables: { id, updateSectionInput: { name: value } },
      onError(error) {
        console.log(error);
        showErrorToast(t('error'));
      },
      onCompleted() {
        showSuccessToast(t('success'));
      },
      optimisticResponse: {
        updateSection: {
          id,
          name: value,
          __typename: 'SectionModel',
        },
      },
    });
  };
  const onDeleteClick = async () => {
    await deleteSection({
      variables: { id: id },
      onError(error) {
        console.error(error);
        showErrorToast(t('error'));
      },
      onCompleted() {
        showSuccessToast(t('success'));
      },
      update(cache) {
        const allShelves = cache.readQuery({
          query: ShelvesSidebar_Query,
        });

        const updatedShelves = allShelves?.findAllShelves?.map((shelf) => {
          return {
            ...shelf,
            sections: shelf.sections.filter((section) => section.id !== id),
          };
        });
        cache.writeQuery({
          query: ShelvesSidebar_Query,
          data: { findAllShelves: updatedShelves },
        });
      },
    });
  };

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
