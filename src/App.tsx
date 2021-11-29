import React from "react";
import styled, {ThemeProvider} from "styled-components";

const Demo = styled('div')`
  text-align: center;
  padding: 60px 0;
`;

export default function App() {
  return (
    <ThemeProvider theme={{}}>
      <Demo>
        Versão: {process.env.REACT_APP_VERSION}
      </Demo>
    </ThemeProvider>
  );
}
