export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  viewBox?: string;
  strokeWidth?: number;
  children?: React.ReactNode;
}

export const Icon = ({
  className = '',
  color = 'currentColor',
  onClick,
  ariaLabel,
  viewBox = '0 0 24 24',
  strokeWidth = 1.5,
  children,
}: IconProps) => {
  //TODO: refactor this
  const sizeClass =
    className.includes('w-') && className.includes('h-') ? '' : 'w-5 h-5';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role={onClick ? 'button' : 'none'}
      aria-label={ariaLabel}
      fill="none"
      viewBox={viewBox}
      strokeWidth={strokeWidth}
      stroke={color}
      className={`${sizeClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </svg>
  );
};
