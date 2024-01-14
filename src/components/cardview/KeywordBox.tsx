import React, { useState } from "react";
import { styled } from "styled-components";

const KeywordBox = () => {
  return (
    <Container>
      <TitleDiv>
        <KeyTitle></KeyTitle>
        <InfoIcon />
      </TitleDiv>
      <Keyword></Keyword>
      <Keyword></Keyword>
      <Keyword></Keyword>
      <Keyword></Keyword>
      <Keyword></Keyword>
    </Container>
  );
};

export default KeywordBox;

const Container = styled.div``;

const TitleDiv = styled.div``;

const KeyTitle = styled.div``;

const InfoIcon = styled.div``;

const Keyword = styled.div``;
