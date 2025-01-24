import { Accordion } from '@libshary/ui/components';
import { FragmentType, gql, useFragment } from '@web/__generated__';
import { ShelfLabel } from '@web/components/shelf/ShelfLabel';
import { useParams } from 'next/navigation';
import { SectionsList } from '../sections-list/SectionsList';

export const ShelvesListItem_ShelfFragment = gql(`
    fragment ShelvesListItem_ShelfFragment on ShelfModel {
      id
      name
      description
      private
      ownerId
      createdAt
      updatedAt
      ...SectionsList_SectionFragment
    }
  `);

interface ShelfListItemProps {
  shelf: FragmentType<typeof ShelvesListItem_ShelfFragment>;
}
export const ShelfListItem = (props: ShelfListItemProps) => {
  const shelf = useFragment(ShelvesListItem_ShelfFragment, props.shelf);
  const params = useParams<{ shelf: string }>();

  return (
    <Accordion key={shelf.id}>
      <Accordion.Title
        highlight={params.shelf === shelf.id}
        arrowPosition="left"
      >
        <ShelfLabel
          containerClassName="w-full"
          editable={false}
          shelf={shelf}
          showPrivate
          withLink
        />
      </Accordion.Title>
      <Accordion.Content>
        <SectionsList sections={shelf} />
      </Accordion.Content>
    </Accordion>
  );
};
