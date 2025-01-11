type HighlightProps = {
  children: React.ReactNode;
  on: boolean;
};

export const HighlightUi = ({ children, on }: HighlightProps) => {
  return (
    <div className="relative group">
      {children}
      {on && (
        <div className="absolute inset-0 bg-primary opacity-20 rounded transition-opacity duration-300 pointer-events-none"></div>
      )}
    </div>
  );
};
