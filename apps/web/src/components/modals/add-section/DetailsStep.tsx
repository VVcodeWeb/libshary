'use client';
import { useTranslations } from 'next-intl';
import { useAddSection } from '@web/hooks/useAddSectionSteps';
import { gql } from '@web/__generated__';
import { useMutation } from '@apollo/client';
import {
  CreateSectionMutation,
  CreateSectionMutationVariables,
} from '@web/__generated__/graphql';
import { useToast } from '@web/hooks/useToast';
import { useModal } from '@web/hooks/useModal';
import {
  ShelfPage_Query,
  ShelvesSidebar_Query,
} from '@web/actions/shelves/queries';

export const CreateSection = gql(`
  mutation CreateSection($createSectionInput: CreateSectionInput!) {
    createSection(createSectionInput: $createSectionInput) {
      id
      name
    }
  }
`);

export const DetailsStep = () => {
  const { data } = useAddSection();
  const [createSection] = useMutation<
    CreateSectionMutation,
    CreateSectionMutationVariables
  >(CreateSection);
  const t = useTranslations('common');
  const { showErrorToast, showSuccessToast } = useToast();
  const { closeModal } = useModal();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    await createSection({
      variables: {
        createSectionInput: { name, shelfId: data.shelfId },
      },
      onError: (error) => {
        console.error(error);
        showErrorToast(t('error'));
      },
      onCompleted: () => {
        form.reset();
        showSuccessToast(t('success'));
        closeModal('add-section');
      },
      refetchQueries: [
        { query: ShelvesSidebar_Query },
        { query: ShelfPage_Query, variables: { id: data.shelfId } },
      ],
    });
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {t('section-modal.details.title')}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              id="name"
              name="name"
              placeholder={t('section-modal.details.name-placeholder')}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <textarea
            placeholder={t('section-modal.details.description-placeholder')}
            id="description"
            name="description"
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div className="modal-action justify-end">
          <button type="submit" className="btn btn-primary">
            {t('submit')}
          </button>
        </div>
      </form>
    </div>
  );
};
