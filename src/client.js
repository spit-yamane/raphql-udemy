import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const headerslink = new ApolloLink((operation, foward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });
  return foward(operation);
});

const endpoint = 'https://api.github.com/graphql';
const httplink = new HttpLink({ uri: endpoint });
const link = ApolloLink.from([headerslink, httplink]);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
