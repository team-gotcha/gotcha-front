import React, { useState } from "react";
import { styled } from "styled-components";

const MemoItem = () => {
  return (
    <Container>
      <TopDiv>
        <UserDiv>
          <UserProfile></UserProfile>
          <UserName></UserName>
        </UserDiv>
        <QuestionBtn></QuestionBtn>
      </TopDiv>
      <ContentDiv>
        <Content></Content>
        <BtnDiv>
          <ReplyBtn></ReplyBtn>
          <HeartBtn></HeartBtn>
        </BtnDiv>
      </ContentDiv>
      <InputDiv>
        <Input />
        <SubmitBtn />
      </InputDiv>
    </Container>
  );
};

export default MemoItem;

const Container = styled.div``;

const TopDiv = styled.div``;

const UserDiv = styled.div``;

const UserProfile = styled.div``;

const UserName = styled.div``;

const QuestionBtn = styled.button``;

const ContentDiv = styled.div``;

const Content = styled.div``;

const BtnDiv = styled.div``;

const ReplyBtn = styled.button``;

const HeartBtn = styled.button``;

const InputDiv = styled.div``;

const Input = styled.input``;

const SubmitBtn = styled.button``;
