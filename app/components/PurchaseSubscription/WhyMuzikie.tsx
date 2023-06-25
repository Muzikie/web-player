import React from 'react';

import Icon from '~/components/common/Icon';
import { Reason } from './types';

const reasons: Reason[] = [
  {
    icon: 'music',
    title: 'It\'s fresh',
    description: 'We do not curate music with sales in mind.',
  },
  {
    icon: 'sun',
    title: 'It\'s fair',
    description: 'Pay for playing, not for membership.',
  },
  {
    icon: 'sun',
    title: 'It\'s more than music',
    description: 'You can become a part of future.',
  }
];

const Reason = ({ data }: { data: Reason }) => (
  <div className="reason">
    <Icon name={data.icon} />
    <h3>{data.title}</h3>
    <h3 className="description">{data.description}</h3>
  </div>
);

const WhyMuzikie = () => (
  <section className="whyMuzikie">
    <div className="container">
      <h2>Why join Muzikie</h2>
    </div>
    <div className="reasons">
      {
        reasons.map((reason) => (
          <Reason key={reason.title} data={reason} />
        ))
      }
    </div>
  </section>
);

export default WhyMuzikie;
