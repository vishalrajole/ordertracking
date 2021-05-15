import { StyledInput } from "./style";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type: string;
  value: string;
  pattern?: string;
  required?: boolean;
};

const Input = ({ placeholder, type, value, required, onChange }: Props) => {
  return (
    <StyledInput
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;
