import React from 'react';
import { Link } from 'wouter';
import styles from './link.css';

interface TextLinkProps {
  title: string;
  href: string;
}

const TextLink = ({ title, href }: TextLinkProps) => (
  <Link className={styles.textLink} href={href}>{ title }</Link>
);

export default TextLink;
