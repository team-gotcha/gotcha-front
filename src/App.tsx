import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './style/GlobalStyle';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Onboard from './pages/Onboard';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainProject from './pages/MainProject';
import MainInterview from './pages/MainInterview';

import Ready from './pages/Ready';
import InProgress from './pages/InProgress';
import Result from './pages/Result';
import ResultDetail from './pages/ResultDetail';
import MainFinalResult from './pages/MainFinalResult';

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/main/project"
            element={
              <Layout>
                <MainProject />
              </Layout>
            }
          />
          <Route
            path="/main/interview"
            element={
              <Layout>
                <MainInterview />
              </Layout>
            }
          />
          <Route
            path="/main/result"
            element={
              <Layout>
                <MainFinalResult />
              </Layout>
            }
          />
          <Route
            path="/ready/:user_id"
            element={
              <Layout>
                <Ready />
              </Layout>
            }
          />
          <Route
            path="/inprogress/:user_id"
            element={
              <Layout>
                <InProgress />
              </Layout>
            }
          />
          <Route
            path="/result"
            element={
              <Layout>
                <Result />
              </Layout>
            }
          />
          <Route
            path="/result/:user_id"
            element={
              <Layout>
                <ResultDetail />
              </Layout>
            }
          />
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboard />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
