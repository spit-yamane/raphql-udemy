import React, { useState } from 'react';

import { useQuery } from '@apollo/client';
import { SEARCH_REPOSITORIES } from './graphql';
import SearchField from './searchField';

function App() {
  // const { after, before, first, last, query } = initalState;
  const [state, setState] = useState({
    first: 5,
    after: null,
    last: null,
    before: null,
    query: 'フロントエンド',
  });
  const { after, before, first, last, query } = state;
  console.log(query);
  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: { after, before, first, last, query },
  });

  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, query: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log({ data });
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <SearchField props={state.query} onChange={handleChange} />
      </form>
    </div>
  );
}

export default App;
