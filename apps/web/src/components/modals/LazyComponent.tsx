import { useAddBookSteps } from '@web/hooks/useAddBookSteps';
import React from 'react';
import { Suspense } from 'react';

interface LazyComponentProps {
  filename: string;
}
export const LazyComponent = ({ filename }: LazyComponentProps) => {
  const Component = React.lazy(() => import(`./${filename}`));
  return <Suspense fallback={null}>{filename ? <Component /> : null}</Suspense>;
};
