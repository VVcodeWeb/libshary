'use client';
import { ColorSelection } from './ColorSelection';
import { useTranslations } from 'next-intl';
import { gql } from '@web/__generated__';
import { useMutation } from '@apollo/client';
import {
  CreateShelfMutation,
  CreateShelfMutationVariables,
} from '@web/__generated__/graphql';
import { ShelvesSidebar_Query } from '@web/actions/shelves/queries';
import { useToast } from '@web/hooks/useToast';
import { useModal } from '@web/hooks/useModal';

export const CreateShelf = gql(`
  mutation CreateShelf($createShelfInput: CreateShelfInput!) {
    createShelf(createShelfInput: $createShelfInput) {
      id
      name
    }
  }
`);
export const DetailsStep = () => {
  const [createShelf] = useMutation<
    CreateShelfMutation,
    CreateShelfMutationVariables
  >(CreateShelf);
  const { closeModal } = useModal();
  const { showErrorToast, showSuccessToast } = useToast();
  const t = useTranslations('common');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const privacy = formData.get('privacy') === 'on';
    const description = formData.get('description') as string;
    await createShelf({
      variables: {
        createShelfInput: {
          name,
          private: privacy,
          description,
          defaultSections: true,
        },
      },
      refetchQueries: [{ query: ShelvesSidebar_Query }],
      onCompleted: () => {
        form.reset();
        showSuccessToast(t('success'));
        closeModal('add-shelf');
      },
      onError: (error) => {
        console.error(error);
        showErrorToast(t('error'));
      },
    });
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {t('shelf-modal.details.title')}
      </h2>
      <form onSubmit={onSubmit}>
        <div className="flex items-center gap-4 mb-4">
          <ColorSelection />
          <div className="flex-1">
            <input
              type="text"
              id="name"
              name="name"
              placeholder={t('shelf-modal.details.name-placeholder')}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                {t('shelf-modal.details.privacy-label')}
              </span>
              <input
                type="checkbox"
                defaultChecked
                id="privacy"
                name="privacy"
                className={`toggle toggle-primary`}
              />
            </label>
          </div>
        </div>

        <div className="mb-6">
          <textarea
            placeholder={t('shelf-modal.details.description-placeholder')}
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
