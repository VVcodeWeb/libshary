export const useToast = () => {
  const dispatch = () => () => {};
  const showToast = (
    type: 'success' | 'error' | 'info' | 'warning',
    message: string,
  ) => {
    dispatch();
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
