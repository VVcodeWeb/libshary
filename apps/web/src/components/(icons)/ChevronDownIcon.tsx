import { Icon, IconProps } from './Icon';

export const ChevronDownIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </Icon>
  );
};
