import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useRecoilState, useRecoilValue } from 'recoil';
import { loginState, userInfoState } from './recoil/userInfo';


import GlobalStyle from "./style/GlobalStyle";
import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Onboard from "./pages/Onboard";
import OnboardEmail from "./pages/OnboardEmail";

import MainFinalResult from "./pages/MainFinalResult";
import GoogleCallback from "./pages/GoogleCallback";
import MainProject from "./pages/MainProject";
import MainInterview from "./pages/MainInterview";


import Ready from './pages/Ready';
import InProgress from './pages/InProgress';
import Result from './pages/Result';
import ResultDetail from './pages/ResultDetail';
import { useGetProjectList } from './apis/get/useGetProjectList';
import MainCallback from './pages/MainCallback';


function App() {
  const queryClient = new QueryClient();

  //login여부
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  //userData세팅
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/main/project/:project_id"
            element={
              <Layout>
                <MainProject />
              </Layout>
            }
          />
          <Route
            path="/main/interview/:interview_id"
            element={
              <Layout>
                <MainInterview />
              </Layout>
            }
          />
          <Route
            path="/main/result/:interview_id"
            element={
              <Layout>
                <MainFinalResult />
              </Layout>
            }
          />
          <Route
            path="/ready/:interview_id/:user_id"
            element={
              <Layout>
                <Ready />
              </Layout>
            }
          />
          <Route
            path="/inprogress/:interview_id/:user_id"
            element={
              <Layout>
                <InProgress />
              </Layout>
            }
          />
          <Route
            path="/result/:interview_id"
            element={
              <Layout>
                <Result />
              </Layout>
            }
          />
          <Route
            path="/result/:interview_id/:user_id"
            element={
              <Layout>
                <ResultDetail />
              </Layout>
            }
          />
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding/:id" element={<Onboard />} />
          <Route path="/google/callback" element={<GoogleCallback />} />
          <Route path="/main/callback" element={<MainCallback />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
