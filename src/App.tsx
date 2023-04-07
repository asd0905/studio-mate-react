import React from 'react';
import Router from './Router';
import { GlobalStyle } from './styles/theme';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  return (
    <>
      <Router />
      <GlobalStyle />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
