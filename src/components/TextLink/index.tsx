import React from 'react';
import styles from './textLink.css';

interface TextLinkProps {
  data: {
    title: string;
    target: string;
  }
}

const TextLink = ({ data }: TextLinkProps) => (
  <a className={styles.textLink} href={data.target}>{ data.title }</a>
);

export default TextLink;
