import styled from "styled-components";

interface ContainerProps {
  isSmall: boolean;
  isClickable: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: #fff;
  color: ${({ theme }) => theme.colors.main};
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);
  min-width: 320px;
  max-width: 400px;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 16px;
  margin-top: ${({ isSmall }) => (isSmall ? "16px" : 0)};
  cursor: ${({ isClickable }) => isClickable && "pointer"};
  &:hover {
    border: ${({ isClickable, theme }) =>
      isClickable && `1px solid ${theme.colors.main}`};
  }
}`;

export const Title = styled.div`
  font-size: 18px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.main}; ;
`;
