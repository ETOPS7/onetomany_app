import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userCheck } from '../../Redux/actions/userActions';

const { Navigate, useLocation } = require('react-router-dom');

export default function AuthUser({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const location = useLocation();
  useEffect(() => {
    dispatch(userCheck());
  }, []);

  if (!user.id) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}
