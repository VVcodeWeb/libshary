'use client';
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Shelves } from './Shelves';
import { ShelfWithSections } from '@libshary/shared-types';
import { HomeNav } from './HomeNav';
import { ExploreNav } from './ExploreNav';
import { SquaresIcon } from '../(icons)/SquaresIcon';
import { UserImageDropdown } from './UserImage';
import { LanguageSwitch } from './LanguageSwitch';

interface SideBarProps {
  shelves: ShelfWithSections[];
}
export default function Sidebar({ shelves }: SideBarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const transition = 'transition-all duration-200';

  return (
    <div
      className={`sticky top-0 h-screen bg-base-300 flex ${isOpen ? 'w-sidebar' : 'w-sidebar-collapsed'} ${transition}`}
    >
      <div
        className={`w-sidebar-collapsed min-w-sidebar-collapsed join join-vertical`}
      >
        <div className="flex justify-center items-center h-12 border-b content-box border-primary">
          <UserImageDropdown />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="py-4 px-2 join join-vertical gap-6 justify-center flex">
            <HomeNav />
            <ExploreNav />
          </div>
          <hr className="w-full border-t-1 border-primary" />
          <div className="py-4 px-2 join join-vertical gap-6 items-center flex">
            <SquaresIcon onClick={toggleSidebar} />
            <LanguageSwitch />
          </div>
          <div className="flex-1 justify-center flex items-end pb-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div
        className={`flex-grow ml-${isOpen ? 'w-sidebar' : 'w-sidebar-collapsed'} ${transition}`}
      >
        <div
          className={`overflow-hidden ${transition} ${
            isOpen
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <Shelves shelves={shelves} />
        </div>
      </div>
    </div>
  );
}
