import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};

export const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button className={clsx('btn', className)} onClick={onClick} role="button">
      {children}
    </button>
  );
};
