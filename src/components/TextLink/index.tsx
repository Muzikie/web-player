import React from 'react';

interface TextLinkProps {
  data: {
    title: string;
    target: string;
  }
}

const TextLink = ({ data }: TextLinkProps) => (
  <a className="textLint" href={data.target}>{ data.title }</a>
);

export default TextLink;
