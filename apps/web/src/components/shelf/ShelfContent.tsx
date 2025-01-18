'use client';
import { BookWithSection } from '@libshary/shared-types';
import { Section } from '@prisma/client';
import { SectionView } from './(sections)/SectionView';
import { AddBookModalWrapper } from '../modals/addBook/AddBookModalWrapper';

interface ShelfContentProps {
  books: BookWithSection[];
  sections: Section[];
}
export const ShelfContent = ({ books, sections }: ShelfContentProps) => {
  return (
    <div className="p-4">
      {sections.length > 0 &&
        sections.map((section) => (
          <SectionView
            key={section.id}
            section={section}
            books={books.filter((book) => book.sectionId === section.id)}
          />
        ))}
      {sections.length === 0 && (
        <h3>Create your first section to add books there</h3>
      )}
    </div>
  );
};
