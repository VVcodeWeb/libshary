import { Shelf } from '@prisma/client';
import Link from 'next/link';
import { LockIcon } from '../(icons)/LockIcon';

type ShelfLabelProps = {
  shelf: Shelf;
};

export const ShelfLabel = ({ shelf }: ShelfLabelProps) => {
  return (
    <div className="flex gap-2 items-center">
      <div>
        <Link
          href={`/home/shelves/${shelf.id}`}
          className="text-sm no-underline"
        >
          <article className="prose  line-clamp-1">{shelf.name}</article>
        </Link>
      </div>
      <div> {shelf.private && <LockIcon className="w-3 h-3" />}</div>
    </div>
  );
};
