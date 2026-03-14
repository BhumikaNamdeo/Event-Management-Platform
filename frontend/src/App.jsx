import React from 'react';
import 'remixicon/fonts/remixicon.css';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import { useLocation } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/success", "/login"]; 
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <AppRoutes />
    </div>
  );
};

export default App;
