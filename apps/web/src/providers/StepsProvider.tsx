import { useModal } from '@web/hooks/useModal';
import { createContext, useContext, useState } from 'react';

export type Step<S> = {
  label: S;
  component: React.ReactNode;
};

export type StepsContextProps<D, S> = {
  currentStep: number;
  steps: Step<S>[];
  setCurrentStep: (nextStep: number) => void;
  navigateToStep: (label: Step<S>['label']) => void;
  data: D;
  updateData: (data: Partial<D>) => void;
  modal_id: string;
  resetData: () => void;
  openModal: () => void;
  closeModal: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StepsContext = createContext<StepsContextProps<any, any> | undefined>(
  undefined,
);

type StepsProviderProps<D, S> = {
  children: React.ReactNode;
  initialData: D;
  steps: Step<S>[];
  modal_id: string;
};

const StepsProvider = <D, S extends string>({
  children,
  initialData,
  steps,
  modal_id,
}: StepsProviderProps<D, S>) => {
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [data, setData] = useState<D>(initialData);
  const { openModal, closeModal } = useModal({
    modal_id: modal_id,
    onClose: resetData,
    onOpen: () => setCurrentStep(0),
  });

  const updateData: StepsContextProps<D, S>['updateData'] = (
    data: Partial<D>,
  ) => setData((prev) => ({ ...prev, ...data }));

  const navigateToStep = (label: Step<S>['label']) => {
    setCurrentStep(steps.findIndex((step) => step.label === label));
  };
  function resetData() {
    setCurrentStep(-1);
    setData(initialData);
  }

  return (
    <StepsContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        navigateToStep,
        data,
        updateData,
        steps,
        modal_id,
        resetData,
        closeModal,
        openModal,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};

export { StepsContext, StepsProvider };

export const useSteps = <D, S>(): StepsContextProps<D, S> => {
  const context = useContext(StepsContext);
  if (context === undefined) {
    throw new Error('useSteps should be used only inside StepsProvider');
  }
  return context;
};
