import { useLocation } from 'wouter';

const useActiveRoute = (href: string): boolean => {
  const [location] = useLocation();
  return location === href;
};

export default useActiveRoute;
