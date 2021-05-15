import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.secondary};
`;

export const Value = styled.span`
  font-weight: bold;
`;

export const GroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

export const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin: 0;
`;
