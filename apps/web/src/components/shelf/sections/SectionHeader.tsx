'use client';
import { SectionLabel } from './SectionLabel';
interface SectionHeaderProps {
  name: string;
  booksCount: number;
  id: string;
}
export const SectionHeader = ({ name, id, booksCount }: SectionHeaderProps) => {
  return (
    <div className="join join-horizontal gap-2 justify-between my-4">
      <SectionLabel id={id} label={name} editable textClassName="prose-xl" />
      <article className="prose-xl text-gray-500">{booksCount} books</article>
    </div>
  );
};
