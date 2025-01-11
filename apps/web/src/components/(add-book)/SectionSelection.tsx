'use client';
import { ShelfWithSections } from '@bookshary/shared-types';

interface SectionSelectionProps {
  sections: ShelfWithSections['sections'];
  onSectionClick: (id: string) => void;
  selectedId: string;
}
export const SectionSelection = ({
  sections,
  onSectionClick,
  selectedId,
}: SectionSelectionProps) => {
  return (
    <div className="space-y-4">
      <p>Select section</p>
      {sections.map((section) => (
        <div
          key={section.id}
          onClick={() => onSectionClick(section.id)}
          className={`p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 ${selectedId === section.id ? 'bg-primary' : ''}`}
        >
          {section.name}
        </div>
      ))}
    </div>
  );
};
