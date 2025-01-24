import { FragmentType, gql, useFragment } from '@web/__generated__';

export const SectionSelectionItem_SectionFragment = gql(`
  fragment SectionSelectionItem_SectionFragment on SectionModel {
    id
    name
  }
  `);
interface SectionSelectionItemProps {
  section: FragmentType<typeof SectionSelectionItem_SectionFragment>;
  onSectionClick: (id: string) => void;
  selectedId: string;
}

export const SectionSelectionItem = (props: SectionSelectionItemProps) => {
  const { onSectionClick, selectedId } = props;
  const section = useFragment(
    SectionSelectionItem_SectionFragment,
    props.section,
  );
  return (
    <div
      onClick={() => onSectionClick(section.id)}
      className={`p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 ${
        selectedId === section.id ? 'bg-primary' : ''
      }`}
    >
      {section.name}
    </div>
  );
};
