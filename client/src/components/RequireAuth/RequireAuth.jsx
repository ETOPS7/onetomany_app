import { useSelector } from 'react-redux';

const { Navigate, useLocation } = require('react-router-dom');

export default function RequireAuth({ children }) {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (!user.id) {
    return <h1> Ошибка 404: Требуется авторизация </h1>;
  }

  return children;
}
