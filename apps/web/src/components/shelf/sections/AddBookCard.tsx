'use client';
import { useModal } from '@web/hooks/useModal';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

type AddBookCardProps = {
  sectionId: string;
};
export const AddBookCard = ({ sectionId }: AddBookCardProps) => {
  const { shelf } = useParams();
  const { openModal } = useModal();
  console.log({ shelf });
  const onClick = () => {
    openModal({
      id: 'add-book',
      modalProps: {
        selectedSectionId: sectionId,
        shelfId: shelf as string,
      },
    });
  };
  return (
    <div className="card shadow-lg bg-base-300 w-44 h-80" onClick={onClick}>
      <div className="flex flex-col items-center justify-center bg-neutral w-full h-full border-2 border-dashed border-gray-400 cursor-pointer hover:bg-gray-100 transition-all">
        <div className="text-accent font-medium">+ Add a Book</div>
      </div>
    </div>
  );
};
