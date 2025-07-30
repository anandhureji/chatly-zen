// inside LoginSuccess.tsx

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');
    if (token && email) {
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      navigate('/profile');
    }
  }, [location, navigate]);

  return <div>Redirecting…</div>;
};

export default LoginSuccess;
