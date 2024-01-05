// Layout.tsx
import React, { ReactNode } from "react";
import { styled } from "styled-components";

import Header from "./Header";
import SideBar from "./SideBar";
import NavigationBar from "./NavigationBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <NavigationBar />
      <SideBar />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;

const Main = styled.main`
  margin: 15.8rem 0 0 31.2rem;
  width: calc(100% - 31.2rem);
  height: calc(100% - 15.8rem);
`;
