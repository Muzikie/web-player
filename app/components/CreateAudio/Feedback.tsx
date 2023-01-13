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
        <div className="component feedback progressContainer">
          <h4>{data.message}</h4>
          <progress className="progress" max="100"></progress>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Feedback;
