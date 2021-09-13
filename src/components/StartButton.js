import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_STAR } from '../graphql';

const StartButton = ({ props }) => {
  console.log(props);
  const totalCount = props.stargazers.totalCount;
  const viewerHasStarred = props.viewerHasStarred;

  const [addStar, { data, loading, error }] = useMutation(ADD_STAR);

  const handleAddStar = () => {
    addStar({ variables: { input: { starrableId: props.id } } });
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
