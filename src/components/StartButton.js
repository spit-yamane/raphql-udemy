import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_STAR, REMOVE_STAR } from '../graphql';

const StartButton = ({ props }) => {
  const totalCount = props.stargazers.totalCount;
  const viewerHasStarred = props.viewerHasStarred;

  const gql = viewerHasStarred ? REMOVE_STAR : ADD_STAR;

  // eslint-disable-next-line no-unused-vars
  const [addOrRemoveStar, { data, loading, error }] = useMutation(gql);

  const handleAddStar = () => {
    addOrRemoveStar({ variables: { input: { starrableId: props.id } } });
  };

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <button
      onClick={() => {
        handleAddStar();
      }}
    >
      {`${totalCount} star`} | {viewerHasStarred ? 'starrded' : '-'}
    </button>
  );
};

export default StartButton;
