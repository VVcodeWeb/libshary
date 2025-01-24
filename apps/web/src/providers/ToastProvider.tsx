'use client';
import { Toast } from '@libshary/ui/components';
import React, { ReactNode } from 'react';
import { useReactiveVar } from '@apollo/client';
import { toastsVar } from '@web/lib/apollo/vars';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toasts = useReactiveVar(toastsVar);

  return (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
      ))}
      {children}
    </>
  );
};
