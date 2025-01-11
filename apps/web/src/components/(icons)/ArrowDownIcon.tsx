import { Icon, IconProps } from './Icon';

export const ArrowDownIcon = (props: IconProps) => {
  return (
    <Icon {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
      />
    </Icon>
  );
};
