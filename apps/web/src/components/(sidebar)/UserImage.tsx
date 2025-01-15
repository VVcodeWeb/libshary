'use client';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Dropdown } from '../(ui)/Dropdown';

type UserImageType = {
  src: string;
};
const UserImage = ({ src }: UserImageType) => {
  return (
    <div className="rounded-full">
      <Image src={src} alt="user icon" width={24} height={24} />
    </div>
  );
};

export const UserImageDropdown = () => {
  const { data } = useSession();
  const t = useTranslations('common.sidebar');

  return (
    <Dropdown position="right">
      <Dropdown.Button>
        <UserImage src={data?.user?.image as string} />
      </Dropdown.Button>
      <Dropdown.Menu>
        <div className="flex gap-2">
          <UserImage src={data?.user?.image as string} />
          <div>
            <p>{data?.user?.name}</p>
          </div>
        </div>
        <hr className="my-4 border-gray-200" />
        <ul className="space-y-4">
          <li>{t('settings')}</li>
          <li>{t('privacy')}</li>
          <li onClick={() => signOut()} className="cursor-pointer">
            {t('logout')}
          </li>
        </ul>
      </Dropdown.Menu>
    </Dropdown>
  );
};
