import React from 'react';

interface IProps {
  value: string;
  onValueChange: () => void;
  onButtonClick: () => void;
}

export class SearchBar extends React.Component<IProps, unknown> {
  constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange() {
    this.props.onValueChange();
  }

  handleClick() {
    this.props.onButtonClick();
  }

  render() {
    const value = this.props.value;

    return (
      <div className="wrapper search-wrapper">
        <div className="hint">For example, you can search : pikachu, wartortle, metapod, etc.</div>
        <input
          type="text"
          id="search-input"
          className="input"
          value={value}
          onChange={this.handleChange}
        />
        <button id="search-button" className="button" onClick={this.handleClick}>
          search
        </button>
      </div>
    );
  }
}

export default SearchBar;
