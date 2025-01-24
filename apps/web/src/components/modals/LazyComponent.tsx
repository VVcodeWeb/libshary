import React from 'react';
import { Suspense } from 'react';

interface LazyComponentProps {
  filename: string;
  props?: any;
}
export const LazyComponent = ({ filename, props }: LazyComponentProps) => {
  console.log({ filename });
  const Component = React.lazy(() => import(`./${filename}`));
  return (
    <Suspense fallback={null}>
      {filename ? <Component {...props} /> : null}
    </Suspense>
  );
};
