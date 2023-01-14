import React from 'react';

import { FeedbackProps } from './types';

const Feedback = ({ data }: FeedbackProps) => {
  let className;
  if (data.message && !data.error) {
    className = 'success';
  } else {
    className = '';
  }
  return (
    <>
      {!data.error ? (
        <div className={`component feedback ${className}`}>
          <h4>{data.message}</h4>
        </div>
      ) : (
        <div className="component feedback">
          <div>
            <h4>{data.message}</h4>
          </div>
          <div className="progressContainer">
            <progress className="progress" max="100"></progress>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
