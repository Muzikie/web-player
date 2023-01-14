import React from 'react';

import { FeedbackProps } from './types';

const Feedback = ({ data }: FeedbackProps) => {
  return (
    <>
      {!data.error && data.message ? (
        <div className="component feedback success">
          <h4>{data.message}</h4>
        </div>
      ) : (
        ''
      )}

      {data.error ? (
        <div className="component feedback">
          <div>
            <h4>{data.message}</h4>
          </div>
          <div className="progressContainer">
            <progress className="progress" max="100"></progress>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Feedback;
