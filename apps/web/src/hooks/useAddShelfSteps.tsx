import { useSteps } from '@web/providers/StepsProvider';

export type AddShelfData = {
  name: string;
  privacy: 'public' | 'private';
  description?: string;
};

export type AddShelfSteps = 'details';

export const useAddShelfSteps = () => useSteps<AddShelfData, AddShelfSteps>();
