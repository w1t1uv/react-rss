import React from 'react';

interface IState {
  hasError: boolean;
}

class ErrorButton extends React.Component<unknown, IState> {
  constructor(props: unknown) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { hasError: false };
  }

  handleClick() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      throw new Error('Something went wrong :/');
    }

    return (
      <div className="wrapper error-button-wrapper">
        <button className="button error-button" onClick={this.handleClick}>
          press for error
        </button>
      </div>
    );
  }
}

export default ErrorButton;
