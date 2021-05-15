import styled from "styled-components";

interface ContainerProps {
  readonly isSmall: boolean;
  readonly isClickable: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: #fff;
  color: #000;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  min-width: 270px;
  max-width: 320px;
  border-radius: 4px;
  padding: 16px;
  margin-top: ${({ isSmall }) => (isSmall ? "16px" : 0)};
  cursor: ${({ isClickable }) => isClickable && "pointer"};
  &:hover {
    border: ${({ isClickable }) => isClickable && "1px solid #000"};
  }
}`;

export const Title = styled.div`
  font-size: 18px;
  margin-bottom: 24px;
  color: #000;
`;
