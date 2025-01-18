'use client';
import { Toast } from '@web/components/ui/Toast';
import React, { ReactNode } from 'react';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const toasts = [
    {
      id: 1,
      text: 'Hello, world!',
      type: 'success',
    },
  ];
  return (
    <>
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.text} type={toast.type} />
      ))}
      {children}
    </>
  );
};
