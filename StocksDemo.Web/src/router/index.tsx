import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from '../components/Home';
import { About } from '../components/About';
import { Navbar } from '../components/Navbar';
import { getTheme } from '@fluentui/react';

export const AppRouter: React.FC = () => {
  const theme = getTheme();

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <div style={{ height: 'auto', border: '1px solid #eee', marginRight: '4px', backgroundColor: theme.palette.themeLighter }}>
          <Navbar />
        </div>
        <div style={{ overflowY: 'scroll', flex: 1 }}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About msg="React" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
