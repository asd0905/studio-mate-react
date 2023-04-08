import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}
body {
  font-size: 16px;
}
a {
  text-decoration: none;
}
li, ul {
  list-tyle: none;
}
`;