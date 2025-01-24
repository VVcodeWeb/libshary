import { cn } from '../utils';

interface ToastProps {
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  onClose?: () => void;
}
export const Toast = ({ message, type, onClose }: ToastProps) => {
  const typeClass = {
    success: 'alert-success',
    error: 'alert-error',
    info: 'alert-info',
    warning: 'alert-warning',
  }[type];
  return (
    <div className="toast toast-top toast-center">
      <div className={cn('alert', typeClass)}>
        <span>{message}</span>
        {onClose && (
          <button
            className="ml-auto btn btn-sm btn-circle btn-ghost"
            onClick={onClose}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
