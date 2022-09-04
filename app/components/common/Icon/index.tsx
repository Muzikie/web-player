interface IconProps {
  name: string;
  className?: string;
}

const Icon = ({ name, className = '' }: IconProps) => (
  <i className={`component icon ${name} ${className}`}></i>
);

export default Icon;
