import style from './index.module.scss'
import './index.scss'
import App from './app';
import { StrictMode } from 'react';
import * as ReactDOMClient from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);




