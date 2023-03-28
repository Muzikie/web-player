import React from 'react';

import { EmptyStateProps } from './types';

const EmptyState = ({
  title,
  subtitle,
  content,
}: EmptyStateProps) => (
  <section className="component emptyState">
    <div className="wrapper">
      <figure>
        <img
          src="/images/no-result.svg"
          alt="No result icon"
        />
      </figure>
      <header>
        <h3>{title}</h3>
        {
          subtitle && (<p>{ subtitle }</p>)
        }
        {
          content && (<div className='content'>{content}</div>)
        }
      </header>
    </div>
  </section>
);

export default EmptyState;
