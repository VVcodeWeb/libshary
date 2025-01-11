import { Icon, IconProps } from './Icon';

export const ArrowLeftIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
      />
    </Icon>
  );
};
