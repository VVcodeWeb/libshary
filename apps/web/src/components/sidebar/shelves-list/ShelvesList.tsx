import { FragmentType, gql, useFragment } from '@web/__generated__';
import { ShelfListItem } from './ShelvesListItem';

export const ShelvesList_QueryFragment = gql(`
  fragment ShelvesList_QueryFragment on Query {
    findAllShelves {
      id
      ...ShelvesListItem_ShelfFragment
    }
  }
`);
interface ShelvesListProps {
  shelves: FragmentType<typeof ShelvesList_QueryFragment>;
}
export const ShelvesList = (props: ShelvesListProps) => {
  const shelves = useFragment(ShelvesList_QueryFragment, props.shelves);

  return (
    <div className="space-y-3 join join-vertical">
      {shelves?.findAllShelves?.map((shelf) => (
        <ShelfListItem key={shelf.id} shelf={shelf} />
      ))}
    </div>
  );
};
