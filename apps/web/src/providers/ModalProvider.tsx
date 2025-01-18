'use client';
import { LazyComponent } from '@web/components/modals/LazyComponent';

interface ModalProviderProps {
  children: React.ReactNode;
}
export function ModalProvider({ children }: ModalProviderProps) {
  const modals: string[] = [];
  return (
    <>
      {modals.map((filename) => (
        <LazyComponent key={filename} filename={filename} />
      ))}
      {children}
    </>
  );
}
