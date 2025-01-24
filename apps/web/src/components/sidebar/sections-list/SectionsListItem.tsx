import { FragmentType, gql, useFragment } from '@web/__generated__';

export const SectionsListItem_SectionFragment = gql(`
    fragment SectionsListItem_SectionFragment on SectionModel {
        id
        name
    }
`);

interface SectionListItemProps {
  section: FragmentType<typeof SectionsListItem_SectionFragment>;
}

export const SectionListItem = (props: SectionListItemProps) => {
  const section = useFragment(SectionsListItem_SectionFragment, props.section);
  return (
    <div key={section.id} className="p-3">
      <article className="line-clamp-1 prose-sm">{section.name}</article>
    </div>
  );
};
