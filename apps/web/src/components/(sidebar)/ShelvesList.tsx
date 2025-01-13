import { ShelfWithSections } from '@libshary/shared-types';
import { ShelfItem } from '../(shelf)/ShelfItem';
import { Accordion } from '../(ui)/Accordion';
import { useParams } from 'next/navigation';

interface ShelvesListProps {
  shelves: ShelfWithSections[];
}
export const ShelvesList = ({ shelves }: ShelvesListProps) => {
  const params = useParams<{ shelf: string }>();

  return (
    <div className="space-y-3 join join-vertical">
      {shelves?.map((shelf) => (
        <Accordion
          key={shelf.id}
          name="shelves-accordion"
          arrowPosition="left"
          highlight={params.shelf === shelf.id}
          title={<ShelfItem shelf={shelf} />}
        >
          {shelf.sections.map((section) => (
            <div key={section.id} className="p-3">
              <article className="line-clamp-1 prose-sm">
                {section.name}
              </article>
            </div>
          ))}
        </Accordion>
      ))}
    </div>
  );
};
