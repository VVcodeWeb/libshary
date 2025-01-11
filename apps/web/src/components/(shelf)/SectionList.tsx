'use client';
import { SectionView } from './SectionView';
import { Section } from '@prisma/client';
import { BookWithSection } from '@bookshary/shared-types';
import { AddBookModalWrapper } from '../(add-book)/AddBookModalWrapper';

interface SectionListProps {
  sections: Section[];
  books: BookWithSection[];
}

export const SectionList = ({ sections, books }: SectionListProps) => {
  return (
    <AddBookModalWrapper sections={sections}>
      <div>
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
    </AddBookModalWrapper>
  );
};
