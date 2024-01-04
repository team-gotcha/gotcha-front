import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";
import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Onboard from "./pages/Onboard";
import Main from "./pages/Main";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/main"
            element={
              <Layout>
                <Main />
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
