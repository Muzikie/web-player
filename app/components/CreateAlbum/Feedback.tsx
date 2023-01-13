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
        <div className="component feedback progressContainer">
          <div>
            <h4>{data.message}hello</h4>
          </div>
          <progress className="progress" max="100"></progress>
        </div>
      )}
    </>
  );
};

export default Feedback;
