import styled from "styled-components";

export const PrimaryButton = styled.button`
  background-color: #020c41;
  border-radius: 8px;
  height: 40px;
  color: #f3f3f3;
  border: none;
  font-size: 16px;
  text-transform: uppercase;
  margin: 16px 0;
  cursor: pointer;
  &:disabled {
    background-color: grey;
  }
}
`;
