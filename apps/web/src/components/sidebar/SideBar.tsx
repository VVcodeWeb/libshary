'use client';
import React, { ReactElement, useState } from 'react';
import ThemeToggle from './bar/ThemeToggle';
import { Shelves } from './Shelves';
import { HomeNav } from './bar/HomeNav';
import { ExploreNav } from './bar/ExploreNav';
import { UserImageDropdown } from './bar/UserImage';
import { LanguageSwitch } from './bar/LanguageSwitch';
import { cn } from '@libshary/ui/utils';
import { SquaresIcon } from '@libshary/ui/icons';

interface BarProps {
  children: React.ReactNode;
}

interface ContentProps {
  children: React.ReactNode;
  isOpen?: boolean;
}

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <div
      className={cn(
        'sticky top-0 h-screen bg-base-300 flex transition-all duration-200',
        {
          'w-sidebar': isOpen,
          'w-sidebar-collapsed': !isOpen,
        },
      )}
    >
      <Sidebar.Bar>
        <div>
          <div className="flex justify-center items-center h-header border-b content-box border-primary">
            <UserImageDropdown />
          </div>
          <div className="flex flex-col flex-grow">
            <div className="py-4 px-2 join join-vertical gap-6 justify-center flex">
              <HomeNav />
              <ExploreNav />
            </div>
            <hr className="w-full border-t-1 border-primary" />
            <div className="py-4 px-2 join join-vertical gap-6 items-center flex">
              <SquaresIcon onClick={toggle} />
              <LanguageSwitch />
            </div>
            <div className="flex-1 justify-center flex items-end pb-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Sidebar.Bar>
      <Sidebar.Content isOpen={isOpen}>
        <Shelves />
      </Sidebar.Content>
    </div>
  );
}

Sidebar.Bar = function Bar({ children }: BarProps): ReactElement {
  return (
    <div className="w-sidebar-collapsed min-w-sidebar-collapsed bg-base-300 h-full join join-vertical">
      {children}
    </div>
  );
};

Sidebar.Content = function Content({
  children,
  isOpen,
}: ContentProps): ReactElement | null {
  const transition = 'transition-all duration-200';

  return (
    <div
      className={cn('flex-grow h-header border-b border-primary', transition, {
        'ml-w-sidebar': isOpen,
        'ml-w-sidebar-collapsed': !isOpen,
      })}
    >
      <div
        className={cn('overflow-hidden', transition, {
          'opacity-100 pointer-events-auto': isOpen,
          'opacity-0 pointer-events-none': !isOpen,
        })}
      >
        {children}
      </div>
    </div>
  );
};
