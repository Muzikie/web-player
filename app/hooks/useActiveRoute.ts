import { useLocation } from 'react-router-dom';

const useActiveRoute = (to: string): boolean => {
  const location = useLocation();
  return location.pathname === to;
};

export default useActiveRoute;
