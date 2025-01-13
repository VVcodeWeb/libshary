import { TransientBookModel, ShelfWithSections } from '@libshary/shared-types';
import { Shelf } from '@prisma/client';
import { useSteps } from '@web/providers/StepsProvider';

export type AddBookData = {
  book: TransientBookModel | null;
  shelf: Shelf;
  sections: ShelfWithSections['sections'];
  selectedSectionId: string;
};

export type AddBookSteps = 'search' | 'details';

export const useAddBookSteps = () => {
  return useSteps<AddBookData, AddBookSteps>();
};
