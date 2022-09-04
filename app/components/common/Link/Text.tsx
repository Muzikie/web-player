import { Link } from "@remix-run/react";
import { useActiveRoute } from '~/hooks';
import { TextLinkProps } from './type';
// const styles: {[key: string]: string} = {};
//import styles from './link.css';

const TextLink = ({ title, to, onClick }: TextLinkProps) => {
  const isActive = useActiveRoute(to);
  const props: any = {
    className: `component link text ${isActive ? 'active' : ''}`,
  };

  if (typeof onClick === 'function') {
    props.onClick = onClick;
  } else {
    props.to = to;
  }

  return (
    <Link {...props}>
      { title }
    </Link>
  );
};

export default TextLink;
