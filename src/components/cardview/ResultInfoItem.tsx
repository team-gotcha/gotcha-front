import React, { useState } from "react";
import { styled } from "styled-components";

import CardTitleBoard from "./CardTitleBoard";
import ResultViewerInfo from "./ResultviewerInfo";
import ResultReviewBox from "./ResultReviewBox";

const ResultInfoItem = () => {
  return (
    <Container>
      <CardTitleBoard />
      <Contents>
        <ResultViewerInfo />
        <ResultReviewBox />
      </Contents>
    </Container>
  );
};

export default ResultInfoItem;

const Container = styled.div``;

const Contents = styled.div``;
