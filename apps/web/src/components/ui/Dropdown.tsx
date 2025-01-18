import { cn } from '@web/lib/utils';
import React, { ReactElement, ReactNode, useState } from 'react';

interface DropdownProps {
  children: React.ReactNode;
  position?: 'end' | 'top' | 'bottom' | 'left' | 'right';
  containerClass?: string;
}

interface ButtonProps {
  children: ReactNode;
  toggle?: () => void;
}

interface MenuProps {
  children: ReactNode;
  isOpen?: boolean;
}

export function Dropdown({
  children,
  position = 'right',
  containerClass,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((prev) => !prev);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    if ((child.type as React.FC).displayName === 'Dropdown.Button') {
      return React.cloneElement(child as ReactElement<ButtonProps>, {
        toggle,
      });
    }
    if ((child.type as React.FC).displayName === 'Dropdown.Menu') {
      return React.cloneElement(child as ReactElement<MenuProps>, {
        isOpen,
      });
    }
    return child;
  });

  return (
    <div className={cn(`dropdown dropdown-${position}`, containerClass)}>
      {childrenWithProps}
    </div>
  );
}

Dropdown.Button = function Button({
  children,
  toggle,
}: ButtonProps): ReactElement {
  return (
    <div tabIndex={0} className="cursor-pointer" onClick={toggle}>
      {children}
    </div>
  );
};
(Dropdown.Button as React.FC).displayName = 'Dropdown.Button';

Dropdown.Menu = function Menu({
  children,
  isOpen,
}: MenuProps): ReactElement | null {
  return isOpen ? (
    <div
      tabIndex={0}
      className="dropdown-content menu text-neutral bg-neutral-content z-[2] shadow gap-y-2 "
    >
      {children}
    </div>
  ) : null;
};
(Dropdown.Menu as React.FC).displayName = 'Dropdown.Menu';
