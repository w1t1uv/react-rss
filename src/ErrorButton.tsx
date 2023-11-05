import React, { useState } from 'react';

function ErrorButton() {
  const [hasError, setHasError] = useState<boolean>(false);

  const handleClick = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Something went wrong :/');
  }

  return (
    <div className="wrapper error-button-wrapper">
      <button className="button error-button" onClick={handleClick}>
        press for error
      </button>
    </div>
  );
}

export default ErrorButton;
