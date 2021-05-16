import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }
  body {
    margin:0;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: system-ui,-apple-system,"Helvetica Neue", Arial, sans-serif;
    font-size: ${({ theme }) => theme.fontSize};
  }

`;

export default GlobalStyle;
