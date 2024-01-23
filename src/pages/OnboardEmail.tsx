import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";

import onboarding from "../assets/images/onboarding1.svg";
import onboarding2 from "../assets/videos/onboarding2.mp4";

const OnboardEmail = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Wrapper>
        <Container>
          <TopBox>
            <Step src={onboarding} />
            <TextDiv>
              <Title>프로젝트 동료를 초대해보세요.</Title>
              <Comments>
                나중에 얼마든지 더 많은 동료와 함께할 수 있습니다.
              </Comments>
            </TextDiv>
            <InputBox>
              <Input type="email" placeholder="구글 이메일 입력" />
              <Input type="email" placeholder="구글 이메일 입력" />
              <Input type="email" placeholder="구글 이메일 입력" />
              <Input type="email" placeholder="구글 이메일 입력" />
            </InputBox>
          </TopBox>
          <BtnDiv>
            <BeforeBtn onClick={() => navigate("/onboarding")}>
              이전으로
            </BeforeBtn>
            <NextBtn onClick={() => navigate("/")}>
              바로 GOTCHA 시작하기
            </NextBtn>
          </BtnDiv>
          <ContentBox>
            <Video muted autoPlay>
              <source src={onboarding2} type="video/mp4" />
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
  height: 100%;
  background-color: #fff;
  padding: 0 15% 4rem;
  overflow: hidden;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 11rem 0 0;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 6% 0 13%;
`;

const Step = styled.img`
  width: 4rem;
  height: 1.2rem;
  transform: scaleX(-1);
  margin-bottom: 2.5rem;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Title = styled.div`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 3rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 56px */
  letter-spacing: -0.12px;
`;

const Comments = styled.div`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 28px */
  letter-spacing: -0.06px;
`;

const BtnDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1.8rem;
  margin-bottom: 3rem;
`;

const NextBtn = styled.button`
  display: flex;
  height: 4rem;
  padding: 1rem 2rem;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 20px;
  border: 1px solid var(--purple-600, #3733ff);
  background: var(--purple-600, #3733ff);

  color: var(--Gray-100, #fff);

  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 155%; /* 24.8px */
  letter-spacing: 0.48px;
`;

const BeforeBtn = styled(NextBtn)`
  border: 1px solid var(--Gray-500, #b3b3b3);
  background: var(--Gray-100, #fff);

  color: var(--Gray-700, #808080);
`;

const InputBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
  margin: 6.5% 0 4rem;
`;

const Input = styled.input`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  align-items: center;
  flex-shrink: 0;

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
