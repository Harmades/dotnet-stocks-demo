import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import "./styles/global.css";

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
