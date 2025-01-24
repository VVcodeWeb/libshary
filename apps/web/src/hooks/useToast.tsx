import { toastsVar, ToastVar } from '@web/lib/apollo/vars';
import { nanoid } from 'nanoid';

export const useToast = () => {
  const showToast = (type: ToastVar['type'], message: ToastVar['message']) => {
    const id = nanoid();
    toastsVar([...toastsVar(), { id, type, message }]);
    setTimeout(() => {
      toastsVar(toastsVar().filter((toast) => toast.id !== id));
    }, 5000);
  };

  const showSuccessToast = (message: string) => showToast('success', message);
  const showErrorToast = (message: string) => showToast('error', message);
  const showInfoToast = (message: string) => showToast('info', message);
  const showWarningToast = (message: string) => showToast('warning', message);

  return {
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast,
  };
};
