import ApolloClient, { gql, HttpLink } from "apollo-boost";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Theme, appThemes, useTheme } from "../themes";
import { ApolloProvider } from "@apollo/react-hooks";

const link = new HttpLink({
  uri: "http://localhost:3000/api/graphql",
  credentials: "include",
});

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
});

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
  // client
  //   .query({
  //     query: gql`
  //       {
  //         users {
  //           id
  //         }
  //       }
  //     `,
  //   })
  //   .then((res) => {
  //     console.log("res", res);
  //   });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={appThemes[idx]}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};
