import React from 'react';

const SearchField = ({ props, onChange }) => {
  return <input type="text" value={props} onChange={onChange} autoFocus />;
};

export default SearchField;
