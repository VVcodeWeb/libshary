'use client';
import { cn } from '@libshary/ui/utils';
import React, { useEffect, useState } from 'react';

interface EditableLabelProps {
  label: string;
  onSave: (value: string) => void;
  children: React.ReactNode;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  onEditEnd?: () => void;
  textClassName?: string;
}
export const EditableLabel = ({
  label,
  onSave,
  isEditing,
  setIsEditing,
  onEditEnd,
  textClassName,
  children,
}: EditableLabelProps) => {
  const [value, setValue] = useState(label);

  const handleSave = () => {
    if (value !== label) onSave(value);
    if (onEditEnd) onEditEnd();

    setIsEditing(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isEditing &&
        event.target instanceof Node &&
        !(event.target as Element).closest('div')
      ) {
        handleSave();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, handleSave, setIsEditing]);

  if (!isEditing) {
    return children;
  }

  return (
    <div>
      <input
        autoFocus
        className={cn(
          'input-bordered input-primary bg-base-100',
          textClassName,
        )}
        type="text"
        value={value}
        onBlur={handleSave}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSave();
          }
        }}
      />
    </div>
  );
};
