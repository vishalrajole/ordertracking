import styled from "styled-components";

export const Image = styled.img`
  max-width: 100%;
  height: auto;
`;

export const Article = styled.div`
  display: grid;
  grid-template-columns: 20px 40px auto;
  margin: 8px 0;
  align-items: center;
  column-gap: 8px;
`;

export const Quantity = styled.span`
  font-size: 14px;
  color: #787878;
`;

export const ArticleInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ArticleNo = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: #787878;
`;
