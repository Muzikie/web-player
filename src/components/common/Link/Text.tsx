import React from 'react';
import styles from './link.css';

interface TextLinkProps {
  title: string;
  target: string;
}

const TextLink = ({ title, target }: TextLinkProps) => (
  <a className={styles.textLink} href={target}>{ title }</a>
);

export default TextLink;
