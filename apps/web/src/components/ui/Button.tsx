import { cn } from '@web/lib/utils';

type ButtonProps = {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};

export const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button className={cn('btn', className)} onClick={onClick} role="button">
      {children}
    </button>
  );
};
