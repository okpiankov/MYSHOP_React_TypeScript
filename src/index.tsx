import { createRoot } from 'react-dom/client';
import './global.css';
import 'normalize.css';

import { App } from './app';

const app = document.getElementById('app');

if (app) {
  const root = createRoot(app);

  root.render(<App />);
}
