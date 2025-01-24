'use client';
import { FragmentType, gql, useFragment } from '@web/__generated__';
import { SectionView } from './sections/SectionView';

export const ShelfPageContent_QueryFragment = gql(`
  fragment ShelfPageContent_QueryFragment on ShelfModel {
    sections {
      id
      ...SectionView_SectionFragment
    }
  }
  `);
interface ShelfContentProps {
  shelf: FragmentType<typeof ShelfPageContent_QueryFragment>;
}
export const ShelfContent = (props: ShelfContentProps) => {
  const shelf = useFragment(ShelfPageContent_QueryFragment, props.shelf);
  if (!shelf) return null;
  const { sections } = shelf;
  return (
    <div className="p-4">
      {sections.length > 0 &&
        sections.map((section) => (
          <SectionView key={section.id} section={section} />
        ))}
      {sections?.length === 0 && (
        <h3>Create your first section to add books there</h3>
      )}
    </div>
  );
};
