'use client';
import { ChevronDownIcon } from '@web/components/(icons)/ChevronDownIcon';
import { ChevronLeftIcon } from '@web/components/(icons)/ChevronLeftIcon';
import { ChevronRightIcon } from '@web/components/(icons)/ChevronRightIcon';
import { ReactElement, ReactNode, useState } from 'react';
import { IconProps } from '../(icons)/Icon';
import { HighlightUi } from './HighlightUi';
import clsx from 'clsx';
import React from 'react';

interface AccordionProps {
  children: React.ReactNode;
}
interface TitleProps {
  children: ReactNode;
  isOpen?: boolean;
  toggle?: () => void;
  arrowPosition?: 'left' | 'right';
  highlight?: boolean;
}
interface ContentProps {
  children: ReactNode;
  isOpen?: boolean;
}

export function Accordion({ children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if ((child.type as React.FC).displayName === 'Accordion.Title') {
      return React.cloneElement(child as ReactElement<TitleProps>, {
        isOpen,
        toggle,
      });
    }
    if ((child.type as React.FC).displayName === 'Accordion.Content') {
      return React.cloneElement(child as ReactElement<ContentProps>, {
        isOpen,
      });
    }
    return child;
  });

  return (
    <div className={clsx('accordion', isOpen && 'open')}>
      {childrenWithProps}
    </div>
  );
}

Accordion.Title = function Title({
  children,
  isOpen,
  toggle,
  arrowPosition,
  highlight,
}: TitleProps): ReactElement {
  const iconProps: IconProps = {
    onClick: toggle,
    className: 'w-3 h-3',
  };
  const getIcon = () => {
    if (arrowPosition === 'left') {
      return isOpen ? (
        <ChevronDownIcon {...iconProps} />
      ) : (
        <ChevronRightIcon {...iconProps} />
      );
    }
    return isOpen ? (
      <ChevronDownIcon {...iconProps} />
    ) : (
      <ChevronLeftIcon {...iconProps} />
    );
  };

  return (
    <HighlightUi on={Boolean(highlight)}>
      <div className="accordion-title flex p-2 items-center gap-2">
        {arrowPosition === 'left' && getIcon()}
        <div className="flex-1">{children}</div>
        {arrowPosition === 'right' && getIcon()}
      </div>
    </HighlightUi>
  );
};
(Accordion.Title as React.FC).displayName = 'Accordion.Title';

Accordion.Content = function Content({
  children,
  isOpen,
}: ContentProps): ReactElement | null {
  return isOpen ? (
    <div className="accordion-content pl-6">{children}</div>
  ) : null;
};
(Accordion.Content as React.FC).displayName = 'Accordion.Content';
