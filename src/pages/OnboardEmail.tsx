import React from "react";
import styled from "styled-components";

import Header from "../components/layout/Header";

import onboarding1 from "../assets/videos/onboarding1.mp4";

const OnboardEmail = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <TopBox>
            <TopDiv>
              <TextDiv>
                <Title>첫번째 프로젝트의 제목을 알려주세요.</Title>
                <Comments>
                  회원님과 팀이 현재 지행하는 면접은 무엇인가요?
                </Comments>
              </TextDiv>
              <NextBtn>다음으로</NextBtn>
            </TopDiv>
            <Input placeholder="면접 이름" />
          </TopBox>
          <ContentBox>
            <Video muted autoPlay loop>
              <source src={onboarding1} type="video/mp4" />
            </Video>
          </ContentBox>
        </Container>
      </Wrapper>
    </>
  );
};

export default OnboardEmail;

const Wrapper = styled.div`
  width: 100%;
  height: 130%;
  background-color: #fff;
  padding: 0 15% 4rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 20% 0 0;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 6% 0 13%;
`;

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Title = styled.div`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 56px */
  letter-spacing: -0.12px;
`;

const Comments = styled.div`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  letter-spacing: -0.06px;
`;

const NextBtn = styled.button`
  display: flex;
  height: 4.8rem;
  padding: 2rem 3rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 20px;
  border: 1px solid var(--Gray-500, #b3b3b3);
  background: var(--Gray-100, #fff);

  color: var(--Gray-700, #808080);

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 155%; /* 24.8px */
  letter-spacing: 0.48px;
`;

const Input = styled.input`
  display: flex;
  width: 55%;
  height: 5%;
  padding: 8px 16px;
  align-items: center;
  flex-shrink: 0;

  margin: 6.5% 0 13%;

  border-radius: 12px;
  border: 1px solid var(--Gray-500, #b3b3b3);
  background: var(--Gray-100, #fff);

  color: var(--purple-600, #3733ff);
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 155%;

  &:focus,
  &:not(:placeholder-shown) {
    border-color: var(--purple-600, #3733ff);
  }

  &::placeholder {
    color: var(--Gray-600, #999);
  }
`;

const ContentBox = styled.div`
  width: 100%;
  background-color: #fff;
  /* padding-bottom: 2rem; */
`;

const Video = styled.video`
  border: none;
  outline: none;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;

  width: 100%;
  height: 60%;
  border-radius: 24px;
`;
