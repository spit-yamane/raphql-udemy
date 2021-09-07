import React from 'react';

const StartButton = ({ props }) => {
  console.log(props.stargazers.totalCount);
  const tatalCount = props.stargazers.totalCount;
  return <button>{`${tatalCount} star`}</button>;
};

export default StartButton;
