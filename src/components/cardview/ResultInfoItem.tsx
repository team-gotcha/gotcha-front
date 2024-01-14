import React, { useState } from "react";
import { styled } from "styled-components";

import CardTitleBoard from "./CardTitleBoard";
import ResultViewerInfo from "./ResultviewerInfo";

const ResultInfoItem = () => {
  return (
    <Container>
      <CardTitleBoard />
      <Contents>
        <ResultViewerInfo />
      </Contents>
    </Container>
  );
};

export default ResultInfoItem;

const Container = styled.div``;

const Contents = styled.div``;
