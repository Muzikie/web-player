import { useLocation } from 'react-router-dom';

export const useActiveRoute = (to: string): boolean => {
  const location = useLocation();
  return location.pathname === to;
};
