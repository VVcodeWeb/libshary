interface TextFieldProps {
  placeholder?: string;
}
export const TextField = ({ placeholder }: TextFieldProps) => {
  return (
    <input
      type="text"
      placeholder={placeholder ?? 'Type here'}
      className="input grow"
    />
  );
};
