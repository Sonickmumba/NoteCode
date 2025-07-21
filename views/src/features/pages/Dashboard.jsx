import React from 'react';
// import { useDispatch } from 'react-redux';
// import { logout } from '../auth/authSlice';
// import { useNavigate } from 'react-router-dom';

import './dashboard.css';

const DashboardLayout = ({ children }) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate('/');
  // };

  return (
    <div className="main-container">
      
      <main className="main">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
