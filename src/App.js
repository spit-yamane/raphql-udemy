import React from 'react';
import { gql, useQuery } from '@apollo/client';

const me = gql`
  query me {
    user(login: "iteachonudemy") {
      name
      avatarUrl
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(me);
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
