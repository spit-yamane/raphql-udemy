import { useQuery, useMutation } from '@apollo/client';
import { SEARCH_REPOSITORIES, ADD_STAR } from '../graphql';

export const GetQueries = (state) => {
  const { after, before, first, last, query } = state;
  //GETメソッド
  const { loading, error, data } = useQuery(SEARCH_REPOSITORIES, {
    variables: { after, before, first, last, query },
  });

  return { loading, error, data };
};
