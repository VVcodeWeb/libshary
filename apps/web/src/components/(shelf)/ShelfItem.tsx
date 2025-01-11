'use client';
import { Shelf } from '@prisma/client';

import { ShelfLabel } from './ShelfLabel';
import { ShelfEdit } from './ShelfEdit';

type ShelfItemProps = {
  shelf: Shelf;
  containerClass?: string;
};
export const ShelfItem = ({ shelf }: ShelfItemProps) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <ShelfLabel shelf={shelf} />
      <ShelfEdit />
    </div>
  );
};
