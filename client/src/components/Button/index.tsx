import { PrimaryButton } from "./style";

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

const Button = ({ children, onClick }: Props) => {
  return <PrimaryButton onClick={onClick}>{children}</PrimaryButton>;
};

export default Button;
