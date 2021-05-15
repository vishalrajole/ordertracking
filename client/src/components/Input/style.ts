import styled from "styled-components";

export const StyledInput = styled.input`
  background: #f0f0f0;
  height: 40px;
  border: none;
  font-size: ${({ theme }) => theme.fontSize};
  margin-bottom: 10px;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 8px;
  &:hover {
    border: none;
  }
  &:focus {
    border: none;
    outline: none;
  }
 
 
}
`;
