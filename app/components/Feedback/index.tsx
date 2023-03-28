import React from 'react';

import { FeedbackProps } from './type';

const Feedback = ({ data }: FeedbackProps) => {
  let className = 'empty';
  if (data.message && data.error) {
    className = 'error';
  } else if (data.message && !data.error) {
    className = 'success';
  }
  return <div className={`component feedback ${className}`}>
    <h5>{data.message}</h5>
  </div>;
};

export default Feedback;
