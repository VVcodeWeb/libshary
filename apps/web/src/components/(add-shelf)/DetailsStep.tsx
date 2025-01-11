'use client';
import { createShelf } from '@web/actions/shelves/mutations';
import { useActionState } from 'react';
import { ColorSelection } from './ColorSelection';
import { useTranslations } from 'next-intl';
export type Color = 'red' | 'green' | 'blue';

//TODO: handle submition feedback, move useActionState to parent, not null data?
export const DetailsStep = () => {
  const [state, action] = useActionState(createShelf, null);
  const t = useTranslations('common');
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {t('shelf-modal.details.title')}
      </h2>
      <form action={action}>
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
        <p aria-live="polite">{state?.message}</p>
        <div className="modal-action justify-end">
          <button type="submit" className="btn btn-primary" formAction={action}>
            {t('submit')}
          </button>
        </div>
      </form>
    </div>
  );
};
