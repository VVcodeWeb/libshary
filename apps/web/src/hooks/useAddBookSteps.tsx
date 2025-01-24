import { SearchQueryBook } from '@web/components/modals/add-book/search-step/SearchStep';
import { useSteps } from '@web/providers/StepsProvider';

export type AddBookData = {
  book: SearchQueryBook[number] | null;
  selectedSectionId: string;
  shelfId: string;
};

export type AddBookSteps = 'search' | 'details';

export const useAddBookSteps = () => {
  return useSteps<AddBookData, AddBookSteps>();
};
