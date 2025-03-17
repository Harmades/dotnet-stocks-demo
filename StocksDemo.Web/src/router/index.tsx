import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import Navbar from '../components/Navbar';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
        <div style={{ height: 'auto', border: '1px solid #eee', background: 'ghostwhite' }}>
          <Navbar />
        </div>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About msg="React" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;
