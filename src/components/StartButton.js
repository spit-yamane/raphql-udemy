import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_STAR, REMOVE_STAR, SEARCH_REPOSITORIES } from '../graphql';

const StartButton = (props) => {
  console.log(props);
  const { node } = props;
  const { query, first, last, before, after } = props.state;
  const starCount = node.stargazers.totalCount;

  const gql = node.viewerHasStarred ? REMOVE_STAR : ADD_STAR;

  const [addOrRemoveStar, { loading, error }] = useMutation(gql, {
    update(cache, { data: { addStar, removeStar } }) {
      const { starrable } = addStar || removeStar;
      const data = cache.readQuery({
        query: SEARCH_REPOSITORIES,
        variables: { query, first, last, after, before },
      });

      const edges = data.search.edges;

      const newEdges = edges.map((edge) => {
        if (edge.node.id === node.id) {
          const totalCount = edge.node.stargazers.totalCount;
          const diff = starrable.viewerHasStarred ? 1 : -1;
          const newTotalCount = totalCount + diff;
          edge.node.stargazers.totalCount = newTotalCount;
        }
        return edge;
      });
      console.log(newEdges);
      data.search.edges = newEdges;
      cache.writeQuery({ query: SEARCH_REPOSITORIES, data });
    },
  });

  const handleAddStar = () => {
    addOrRemoveStar({
      variables: { input: { starrableId: node.id } },
    });
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <button
      onClick={() => {
        handleAddStar();
      }}
    >
      {`${starCount} star`} | {node.viewerHasStarred ? 'starrded' : '-'}
    </button>
  );
};

export default StartButton;
