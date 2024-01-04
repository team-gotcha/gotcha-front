import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Onboard from './pages/Onboard';
import Main from './pages/Main';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboard />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
