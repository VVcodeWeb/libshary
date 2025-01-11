type DropdownProps = {
  children: React.ReactNode;
  button: React.ReactNode;
  containerClass?: string;
  position?: 'end' | 'top' | 'bottom' | 'left' | 'right';
};

export const Dropdown = ({
  button,
  children,
  containerClass,
  position = 'right',
}: DropdownProps) => {
  return (
    <div
      className={`dropdown dropdown-${position ?? ''} ${containerClass ?? ''} `}
    >
      <div tabIndex={0} className="cursor-pointer">
        {button}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-black z-[2] shadow gap-y-2"
      >
        {children}
      </ul>
    </div>
  );
};
