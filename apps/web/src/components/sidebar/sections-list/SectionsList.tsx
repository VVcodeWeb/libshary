import { FragmentType, gql, useFragment } from '@web/__generated__';
import { SectionListItem } from './SectionsListItem';

export const SectionsList_SectionFragment = gql(`
    fragment SectionsList_SectionFragment on ShelfModel {
      sections {
        id
        ...SectionsListItem_SectionFragment
      }
    }`);

interface SectionsListProps {
  sections: FragmentType<typeof SectionsList_SectionFragment>;
}
export const SectionsList = (props: SectionsListProps) => {
  const { sections } = useFragment(
    SectionsList_SectionFragment,
    props.sections,
  );

  return (
    <>
      {sections.map((section) => (
        <SectionListItem key={section.id} section={section} />
      ))}
    </>
  );
};
