import React from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_REPOSITORIES } from './graphql';

const VARIABLES = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: 'web',
};

function App({ searchRepositories }) {
  const { after, before, first, last, query } = VARIABLES;

  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: { after, before, first, last, query },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log({ data });
  return <div></div>;
}

export default App;
