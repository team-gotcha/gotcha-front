// Layout.tsx
import React, { ReactNode } from "react";
import { styled } from "styled-components";

import Header from "./Header";
import SideBar from "./SideBar";
import NavigationBar from "./NavigationBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalContent, modalState } from "../../recoil/modal";
import { useToggleModal } from "../../hooks/useToggleModal";
import ReviewModal from "../cardview/modal/ReviewModal";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  //modal관리
  const isModalOpen = useRecoilValue(modalState);
  const modalItem = useRecoilValue(modalContent);
  const { openModal } = useToggleModal();

  return (
    <>
      <Header />
      <NavigationBar />
      <SideBar />
      <Main>{children}</Main>

      {isModalOpen && (
        <ModalWrapper>
          <ModalBackground onClick={openModal} />
          <ModalContentWrapper>{modalItem}</ModalContentWrapper>
        </ModalWrapper>
      )}
    </>
  );
};

export default Layout;

const Main = styled.main`
  margin: 15.8rem 0 0 31.2rem;
  width: calc(100% - 31.2rem);
  height: calc(100% - 15.8rem);
  overflow: hidden;
`;
const ModalContentWrapper = styled.main`
  z-index: 45;
`;
const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 15;
`;
