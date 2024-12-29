import { createContext, useState } from "react";

export type Step<S> = {
  label: S;
  component: React.ReactNode;
};

type StepsContext<D, S> = {
  currentStep: number;
  steps: Step<S>[];
  setCurrentStep: (nextStep: number) => void;
  navigateToStep: (label: Step<S>["label"]) => void;
  data: D;
  updateData: (data: D) => void;
};

type StepperProviderProps<D, S> = {
  children: React.ReactNode;
  initialData: D;
  steps: Step<S>[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StepsContext = createContext<StepsContext<any, any> | undefined>(
  undefined
);

const StepsProvider = <D, S extends string>({
  children,
  initialData,
  steps,
}: StepperProviderProps<D, S>) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [data, setData] = useState<D>(initialData);

  const updateData: StepsContext<D, S>["updateData"] = (data) =>
    setData((prev) => ({ ...prev, ...data }));

  const navigateToStep = (label: Step<S>["label"]) => {
    setCurrentStep(steps.findIndex((step) => step.label === label));
  };

  return (
    <StepsContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        navigateToStep,
        data,
        updateData,
        steps,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
};

export { StepsContext, StepsProvider };
