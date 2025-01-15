import { useSteps } from '@web/providers/StepsProvider';

export type AddSectionData = {
  shelfId: string;
};

export type AddSectionSteps = 'details';

export const useAddSection = () => {
  return useSteps<AddSectionData, AddSectionSteps>();
};
