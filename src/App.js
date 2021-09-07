import React, { useState } from 'react';

import { useQuery } from '@apollo/client';
import { SEARCH_REPOSITORIES } from './graphql';
import SearchField from './searchField';

function App() {
  const PER_PAGE = 5;
  const [state, setState] = useState({
    first: PER_PAGE,
    after: null,
    last: null,
    before: null,
    query: 'フロントエンドエンジニア',
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
  const goNext = (search) => {
    setState({
      ...state,
      after: search.pageInfo.endCursor,
      before: null,
      first: PER_PAGE,
      last: null,
    });
  };
  const goPrevious = (search) => {
    setState({
      ...state,
      after: null,
      before: search.pageInfo.startCursor,
      first: null,
      last: PER_PAGE,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log({ data });

  const search = data.search;
  const repositoryCount = search.repositoryCount;
  const repositoryUnit = repositoryCount === 1 ? 'Repository' : 'Repositories';
  const title = `GitHub ${repositoryUnit} Search Results - ${repositoryCount}`;
  const edges = search.edges;
  const pageInfo = search.pageInfo;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <SearchField props={state.query} onChange={handleChange} />
      </form>
      <p>{title}</p>
      <ul>
        {edges.map((edge) => {
          const node = edge.node;
          return (
            <li key={node.id}>
              <a href={node.url} rel="noreferrer" target="_blank">
                {node.name}
              </a>
            </li>
          );
        })}
      </ul>
      {pageInfo.hasPreviousPage ? (
        <button onClick={() => goPrevious(search)}>Previous</button>
      ) : null}
      {pageInfo.hasNextPage ? (
        <button onClick={() => goNext(search)}>Next</button>
      ) : null}
    </div>
  );
}

export default App;
