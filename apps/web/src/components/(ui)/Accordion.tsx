'use client';
import { ChevronDownIcon } from '@web/components/(icons)/ChevronDownIcon';
import { ChevronLeftIcon } from '@web/components/(icons)/ChevronLeftIcon';
import { ChevronRightIcon } from '@web/components/(icons)/ChevronRightIcon';
import { useState } from 'react';
import { IconProps } from '../(icons)/Icon';
import { HighlightUi } from './HighlightUi';
import clsx from 'clsx';

type AccordionProps = {
  title: string | React.ReactNode;
  children: React.ReactNode;
  name: string;
  highlight?: boolean;
  arrowPosition?: 'left' | 'right';
};

export const Accordion = ({
  title,
  children,
  highlight,
  arrowPosition = 'right',
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const getIcon = () => {
    const iconProps: IconProps = {
      onClick: toggleAccordion,
      className: 'w-3 h-3',
    };
    if (arrowPosition === 'left') {
      if (isOpen) return <ChevronDownIcon {...iconProps} />;
      else return <ChevronRightIcon {...iconProps} />;
    }
    if (isOpen) return <ChevronDownIcon {...iconProps} />;
    else return <ChevronLeftIcon {...iconProps} />;
  };

  return (
    <div className={clsx('accordion', isOpen && 'open')}>
      <HighlightUi on={Boolean(highlight)}>
        <div className="accordion-title flex p-2 items-center gap-2">
          {arrowPosition === 'left' && getIcon()}
          <div className="flex-1">{title}</div>
          {arrowPosition === 'right' && getIcon()}
        </div>
      </HighlightUi>

      {isOpen && <div className="accordion-content pl-6">{children}</div>}
    </div>
  );
};
