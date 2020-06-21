import ApolloClient, { InMemoryCache, gql } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { TOKEN_KEY } from "../requests/auth";
import { authMutations } from "../resolvers/Mutations/authMutations";
import { authQueries } from "../resolvers/Queries/authQueries";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000",
  request: (operation) => {
    const token = localStorage.getItem(TOKEN_KEY);
    operation.setContext({
      headers: token ? `Bearer ${token}` : "",
    });
  },
  resolvers: {
    Mutation: {
      ...authMutations,
    },
    Query: {
      ...authQueries,
    },
  },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
      <style global jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          height: 100%;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
