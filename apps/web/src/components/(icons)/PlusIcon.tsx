import { Icon, IconProps } from './Icon';

export const PlusIcon = (props: IconProps) => (
  <Icon {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </Icon>
);
