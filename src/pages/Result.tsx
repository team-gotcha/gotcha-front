import React from "react";
import styled from "styled-components";

import ResultInfoItem from "../components/cardview/ResultInfoItem";

const Result = () => {
  return (
    <>
      <Background />
      <Container>
        <ResultInfoItem />
        <ResultInfoItem />
        <ResultInfoItem />
        <ResultInfoItem />
      </Container>
    </>
  );
};

export default Result;

const Background = styled.div``;

const Container = styled.div``;

const Contents = styled.div``;

const MemoDiv = styled.div``;
