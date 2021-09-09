import React from 'react';

const StartButton = ({ props }) => {
  console.log(props);
  const tatalCount = props.stargazers.totalCount;
  const viewerHasStarred = props.viewerHasStarred;
  return (
    <button>
      {`${tatalCount} star`} | {viewerHasStarred ? 'starded' : '-'}
    </button>
  );
};

export default StartButton;
