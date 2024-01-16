import React from "react";
import styled from "styled-components";

import ResultInfoItem from "../components/cardview/ResultInfoItem";

const Result = () => {
  return (
    <Wrapper>
      <Background />
      <Container>
        <ResultInfoItem />
        <ResultInfoItem />
        <ResultInfoItem />
        <ResultInfoItem />
      </Container>
    </Wrapper>
  );
};

export default Result;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  height: 100%;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: var(--gray-background-gray-55, rgba(50, 50, 50, 0.55));
  backdrop-filter: blur(6px);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 0.5rem 1.35rem 0.5rem 4rem;
  margin: 4.5rem 2.8rem 4.5rem 0;

  z-index: 10;
  overflow-y: auto;
  width: 100%;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #e6e6e6; /* 스크롤바의 색상 */

    border-radius: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
