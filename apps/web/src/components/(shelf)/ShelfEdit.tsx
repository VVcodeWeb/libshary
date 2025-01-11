import { EllipsisIcon } from '../(icons)/EllipsisIcon';
import { Dropdown } from '../(ui)/Dropdown';
import { useTranslations } from 'next-intl';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ShelfEditProps = unknown;
export const ShelfEdit = () => {
  const t = useTranslations('common');
  return (
    <Dropdown button={<EllipsisIcon className="w-6 cursor-pointer" />}>
      <li>{t('delete')}</li>
      <li>{t('edit')}</li>
    </Dropdown>
  );
};
