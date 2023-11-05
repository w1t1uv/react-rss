import React from 'react';

interface IProps {
  value: string;
  onValueChange: () => void;
  onButtonClick: () => void;
}

function SearchBar(props: IProps) {
  const { value, onValueChange, onButtonClick } = props;

  function handleChange() {
    onValueChange();
  }

  function handleClick() {
    onButtonClick();
  }

  return (
    <div className="wrapper search-wrapper">
      <div className="hint">For example, you can search : pikachu, wartortle, metapod, etc.</div>
      <input
        type="text"
        id="search-input"
        className="input"
        value={value}
        onChange={handleChange}
      />
      <button id="search-button" className="button" onClick={handleClick}>
        search
      </button>
    </div>
  );
}

export default SearchBar;
