import { useSelector } from 'react-redux';

const { Navigate, useLocation } = require('react-router-dom');

export default function AuthUser({ children }) {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (!user.id) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
}
