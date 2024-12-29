import { StepsContext } from "@/context/StepsContext";
import { useContext } from "react";

export const useSteps = <D, S>(): StepsContext<D, S> => {
  const context = useContext(StepsContext);
  if (context === undefined) {
    throw new Error("useSteps should be used only inside StepsProvider");
  }
  return context;
};
