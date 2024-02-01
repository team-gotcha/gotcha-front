import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import GlobalStyle from './style/GlobalStyle';
import { RecoilRoot } from 'recoil';
import './assets/fonts/font.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import TokenRefresher from './components/auth/TokenRefresher';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const queryClient = new QueryClient();
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <TokenRefresher />
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </RecoilRoot>
);
