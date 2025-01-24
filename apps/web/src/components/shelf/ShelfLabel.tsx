'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@web/lib/i18n/routing';
import { cn } from '@libshary/ui/utils';
import { Dropdown } from '@libshary/ui/components';
import { EllipsisIcon, LockIcon } from '@libshary/ui/icons';
import { EditableLabel } from '@libshary/ui/form';
import {
  RemoveShelfMutation,
  RemoveShelfMutationVariables,
  ShelfModel,
  UpdateShelfMutation,
  UpdateShelfMutationVariables,
} from '@web/__generated__/graphql';
import { useToast } from '@web/hooks/useToast';
import { useMutation } from '@apollo/client';
import { ShelvesSidebar_Query } from '@web/actions/shelves/queries';
import { gql } from '@web/__generated__';
export const UpdateShelf = gql(`
  mutation UpdateShelf($id: String!, $updateShelfInput: UpdateShelfInput!) {
    updateShelf(id: $id, updateShelfInput: $updateShelfInput) {
      id
      name
    }
  }
`);

export const RemoveShelf = gql(`
  mutation RemoveShelf($id: String!) {
    removeShelf(id: $id) {
      id
    }
  }
`);

interface ShelfLabelProps {
  shelf: Pick<ShelfModel, 'id' | 'name' | 'private'>;
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
  textClassName = '',
  containerClassName = '',
}: ShelfLabelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { showErrorToast, showSuccessToast } = useToast();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const [updateShelf] = useMutation<
    UpdateShelfMutation,
    UpdateShelfMutationVariables
  >(UpdateShelf);

  const [removeShelf] = useMutation<
    RemoveShelfMutation,
    RemoveShelfMutationVariables
  >(RemoveShelf);

  const onEditClick = () => setIsEditing(true);

  const onEditSave = async (value: string) => {
    if (!value) {
      showErrorToast('Validation error');
      return;
    }
    await updateShelf({
      variables: { id: shelf.id, updateShelfInput: { name: value } },
      onError: (error) => {
        console.error(error);
        showErrorToast(t('error'));
      },
      onCompleted: () => {
        showSuccessToast(t('success'));
      },
      optimisticResponse: {
        updateShelf: {
          id: shelf.id,
          name: value,
          __typename: 'ShelfModel',
        },
      },
    });
  };

  const onDeleteClick = async () => {
    await removeShelf({
      variables: { id: shelf.id },
      onCompleted: () => {
        showSuccessToast(t('success'));
        if (pathname.includes(shelf.id)) {
          router.push('/home');
        }
      },
      onError: () => {
        showErrorToast(t('error'));
      },
      update: (cache) => {
        cache.updateQuery(
          {
            query: ShelvesSidebar_Query,
          },
          (data) => {
            return {
              ...data,
              findAllShelves: data?.findAllShelves?.filter(
                (cShelf) => cShelf.id !== shelf.id,
              ),
            };
          },
        );
      },
    });
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
          <div className="cursor-pointer" onClick={onEditClick}>
            {t('edit')}
          </div>
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
