import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../components/Home';
import { About } from '../components/About';
import { Navbar } from '../components/Navbar';
import { getTheme } from '@fluentui/react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { RegisterComponent } from '../components/Register';
import { LoginComponent } from '../components/Login';
import { UserContext } from '../utils/UserContext';

export const AppRouter: React.FC = () => {
  const theme = getTheme();
  const [userContext, setUserContext] = React.useState<UserContext | null>(null);

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <div style={{ border: '1px solid #eee', marginRight: '4px', backgroundColor: theme.palette.themeLighter }}>
          <Navbar userContext={userContext} setUserContext={setUserContext} />
        </div>
        <div style={{ overflowY: 'scroll', flex: 1 }}>
          <Routes>
            <Route element={<ProtectedRoute userContext={userContext} setUserContext={setUserContext} />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="login" element={<LoginComponent setUserContext={setUserContext} />} />
            <Route path="about" element={<About msg="React" />} />
            <Route path="register" element={<RegisterComponent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
