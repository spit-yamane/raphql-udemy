import React from 'react';
import { useQuery } from '@apollo/client';
import { ME } from './graphql';

function App() {
  const { loading, error, data } = useQuery(ME);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <div className="App">Hello World</div>
      <p>{data.user.name}</p>
    </div>
  );
}

export default App;
