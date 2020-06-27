import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Theme, appThemes, useTheme } from "../themes";

const GlobalStyle = createGlobalStyle`
    body {
        height: 98%;
        background-color: ${function (props: { theme: Theme }) {
          return props.theme.BackgroundMain;
        }};
        color: ${function (props: { theme: Theme }) {
          return props.theme.TextColour;
        }};
        overflow-y: auto;
        font-family: Camphor, Open Sans, Segoe UI, sans-serif;
    }

    html {
        height: 100%;
    }

    #__next {
        height: 100%;
    }
`;

export default ({ Component, pageProps }) => {
  const [idx, switchTheme] = useTheme();
  return (
    <ThemeProvider theme={appThemes[idx]}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};
