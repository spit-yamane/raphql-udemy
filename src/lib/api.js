import { useQuery } from '@apollo/client';
import { SEARCH_REPOSITORIES } from '../graphql';

export const GetQueries = (state) => {
  const { after, before, first, last, query } = state;
  //GETメソッド
  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { after, before, first, last, query },
  });

  return { loading, error, data };
};
