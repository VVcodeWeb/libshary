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
  resetData: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StepsContext = createContext<StepsContextProps<any, any> | undefined>(
  undefined,
);

type StepsProviderProps<D, S> = {
  children: React.ReactNode;
  initialData: D;
  steps: Step<S>[];
};

const StepsProvider = <D, S extends string>({
  children,
  initialData,
  steps,
}: StepsProviderProps<D, S>) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [data, setData] = useState<D>(initialData);

  const updateData: StepsContextProps<D, S>['updateData'] = (
    data: Partial<D>,
  ) => setData((prev) => ({ ...prev, ...data }));

  const navigateToStep = (label: Step<S>['label']) => {
    setCurrentStep(steps.findIndex((step) => step.label === label));
  };
  function resetData() {
    setCurrentStep(0);
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
        resetData,
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
  return context as StepsContextProps<D, S>;
};
