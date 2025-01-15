'use client';
import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { createSection } from '@web/actions/sections/mutations';
import { useAddSection } from '@web/hooks/useAddSectionSteps';

export const DetailsStep = () => {
  const { data } = useAddSection();
  const createSectionWithId = createSection.bind(null, data.shelfId);
  const [state, action] = useActionState(createSectionWithId, null);
  const t = useTranslations('common');
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        {t('section-modal.details.title')}
      </h2>
      <form action={action}>
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
