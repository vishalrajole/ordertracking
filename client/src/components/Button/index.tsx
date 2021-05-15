import { PrimaryButton } from "./style";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  disabled: boolean;
};

const Button = ({ children, disabled, onClick }: Props) => {
  return (
    <PrimaryButton disabled={disabled} onClick={onClick}>
      {children}
    </PrimaryButton>
  );
};

export default Button;
