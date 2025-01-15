import { BookWithSection } from '@libshary/shared-types';
import { SectionList } from './SectionList';
import { Section } from '@prisma/client';

interface ShelfContentProps {
  books: BookWithSection[];
  sections: Section[];
}
export const ShelfContent = ({ books, sections }: ShelfContentProps) => {
  return (
    <div className="p-4">
      <SectionList books={books} sections={sections} />
    </div>
  );
};
