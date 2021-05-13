import { FunctionComponent } from "react";
import { Container } from "./style";

const Card: FunctionComponent = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Card;
