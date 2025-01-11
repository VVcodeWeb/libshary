import { Icon, IconProps } from './Icon';
export const ChevronLeftIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </Icon>
  );
};
