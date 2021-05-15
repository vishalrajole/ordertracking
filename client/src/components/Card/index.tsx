import { Link } from "react-router-dom";

import { Container, Title } from "./style";

type Props = {
  children: React.ReactNode;
  isSmall?: boolean;
  title?: string;
  toBack?: string;
  isClickable?: boolean;
  onClick?: () => void;
};

const Card = ({
  children,
  isSmall = false,
  onClick,
  toBack = "",
  isClickable = false,
  title,
}: Props) => {
  return (
    <Container isSmall={isSmall} onClick={onClick} isClickable={isClickable}>
      {toBack && (
        <Link style={{ marginBottom: 10 }} to={toBack}>
          Go Back
        </Link>
      )}
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  );
};

export default Card;
