import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_STAR, REMOVE_STAR, SEARCH_REPOSITORIES } from '../graphql';

const StartButton = (props) => {
  const { node } = props;
  const starCount = node.stargazers.totalCount;

  const gql = node.viewerHasStarred ? REMOVE_STAR : ADD_STAR;

  const [addOrRemoveStar, { loading, error }] = useMutation(gql, {
    refetchQueries: SEARCH_REPOSITORIES,
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
