import { PrimaryButton } from "./style";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  disabled: boolean;
  dataTestId: string;
};

const Button = ({ children, disabled, onClick, dataTestId }: Props) => {
  return (
    <PrimaryButton
      disabled={disabled}
      onClick={onClick}
      data-testid={dataTestId}
    >
      {children}
    </PrimaryButton>
  );
};

export default Button;
