import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import GlobalStyle from './style/GlobalStyle';
import { RecoilRoot } from 'recoil';
import './assets/fonts/font.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from 'react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </RecoilRoot>
);
