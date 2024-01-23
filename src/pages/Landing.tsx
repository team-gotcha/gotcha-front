import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useGetUserInfo } from '../apis/get/useGetUserInfo';
import CommonButton from '../components/common/CommonButton';
import Logo from '../assets/icons/Logo';
import BannerImg from '../assets/images/BannerImg.svg';

import landing1 from '../assets/videos/landing1.mp4';
import landing2 from '../assets/videos/landing2.mp4';
import landing3 from '../assets/videos/landing3.mp4';

const Landing = () => {
  const [selectedNavItem, setSelectedNavItem] = useState(0);
  const navigate = useNavigate();
  const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?include_granted_scopes=true&scope=profile&state=state_parameter_passthrough_value&response_type=code&redirect_uri=${process.env.REACT_APP_GOOGLE_AUTH_REDIRECT_URI}&client_id=${process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}`;
  const handleLogin = () => {
    window.location.href = loginUrl;
  };
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const NavData = [
    {
      index: 1,
      title: '지원자 파악부터 평가까지,\n GOTCHA에서는 빠르고 효율적으로!',
      text: `지원자 별 역량과 강점 파악에 너무 많은 시간을 들이고 있지는 않으셨나요? GOTCHA에서는 지원자의 강점을 정리하는 것부터 면접 결과를 발송하기까지의 전 과정을 지원합니다.`,
      video: landing1,
    },
    {
      index: 2,
      title: `면접 일정 관리부터 결과 전달까지,\n 모두 GOTCHA에서!`,
      text: `복잡한 면접 전형 단계에 부담을 느끼셨다면? 면접을 진행하며 바로 답변을 기입하고, 지원자에 대한 한줄평까지 바로 작성해 객관적인 현장감을 언제든 확인할 수 있게 지원합니다.`,
      video: landing2,
    },
    {
      index: 3,
      title: `맞춤형 질문을 통해\n 완성도 높은 면접질문을 구축합니다.`,
      text: `면접 질문 구성에 어려움이나 답답함을 느끼시지는 않으셨나요? 갓챠가 직종별, 유형별로 큐레이팅하는 면접 질문 리스트들에서 우리 조직에 알맞는 질문들을 골라보세요!`,
      video: landing3,
    },
  ];

  useEffect(() => {
    setIsVideoPlaying(true);
  }, [selectedNavItem]);
  return (
    <Wrapper>
      <TopBar>
        <Logo />
        <RowBox>
          <CommonButton
            color="lineGray"
            children="회원가입"
            size="small"
            onClick={handleLogin}
          />
          <CommonButton
            color="lineGray"
            children="로그인"
            size="small"
            onClick={handleLogin}
          />
        </RowBox>
      </TopBar>
      <Banner style={{ backgroundImage: `url(${BannerImg})` }}>
        <BannerTitle>우리 조직에 FIT한 인재,</BannerTitle>
        <BannerTitle>가장 빠르고 정확하게.</BannerTitle>

        <BannerSubTitle>
          수많은 지원자들을 쉽게 관리하고, 조직에 가장 잘 맞는 인재를
          찾아드릴게요.
        </BannerSubTitle>

        <CommonButton
          color="fillBlue"
          children="갓챠 시작하기"
          size="large"
          width="30rem"
          onClick={() => navigate('/main/project')}
        />
      </Banner>

      <Body>
        <ColumnWrapper>
          <NavBar>
            <NavTitle
              onClick={() => {
                setSelectedNavItem(0);
              }}
            >
              지원자 관리 자동화
            </NavTitle>
            <NavTitleCenter
              onClick={() => {
                setSelectedNavItem(1);
              }}
            >
              All in One 면접 진행
            </NavTitleCenter>
            <NavTitle
              onClick={() => {
                setSelectedNavItem(2);
              }}
            >
              맞춤형 질문 큐레이션
            </NavTitle>
          </NavBar>
          <NavBody>
            <BodyLeft>
              <NavSubTitle>{NavData[selectedNavItem].title}</NavSubTitle>
              <NavSubText>{NavData[selectedNavItem].text}</NavSubText>
            </BodyLeft>
            <BodyRight>
              /
              {NavData[selectedNavItem].index === 1 && (
                <Video muted autoPlay>
                  <source src={landing1} type="video/mp4" />
                </Video>
              )}
              {NavData[selectedNavItem].index === 2 && (
                <Video muted autoPlay>
                  <source src={landing2} type="video/mp4" />
                </Video>
              )}
              {NavData[selectedNavItem].index === 3 && (
                <Video muted autoPlay>
                  <source src={landing3} type="video/mp4" />
                </Video>
              )}
            </BodyRight>
          </NavBody>
        </ColumnWrapper>

        <ColumnWrapper>
          <NavBar>
            <NavSubTitle>GOTCHA Q&A</NavSubTitle>
          </NavBar>
        </ColumnWrapper>
      </Body>
    </Wrapper>
  );
};

export default Landing;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Video = styled.video`
  border: none;
  outline: none;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;

  width: 100%;
  height: 100%;
  border-radius: 2.4rem;
`;
//NavBar
const NavBody = styled.div`
  display: flex;
  width: 100%;

  padding-left: 7%;
`;
const BodyLeft = styled.div`
  width: 30%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  padding-bottom: 5rem;
`;
const BodyRight = styled.div``;
const NavSubTitle = styled.div`
  color: ${(props) => props.theme.colors.purple.purple600};
  ${(props) => props.theme.fontStyles.headline.headlineBold};
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 700;

  word-break: keep-all;
  white-space: pre-line;
`;
const NavSubText = styled.div`
  color: ${(props) => props.theme.colors.gray.gray1100};

  ${(props) => props.theme.fontStyles.subtitle.subtitleRegular};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.048px;

  word-break: keep-all;
  white-space: pre-line;
`;

//Body
const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15%;

  padding-top: 8.4rem;
`;
const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
  height: 80rem;

  padding-top: 4.7rem;
`;
const NavBar = styled.div`
  display: flex;

  margin-right: 15%;
`;
const NavTitleCenter = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 49.7rem;
  color: ${(props) => props.theme.colors.gray.gray700};
  text-align: center;

  ${(props) => props.theme.fontStyles.headline.headlineBold};
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 700;

  &:hover {
    color: ${(props) => props.theme.colors.purple.purple600};
  }
  border-right: 2px solid ${(props) => props.theme.colors.gray.gray400};
  border-left: 2px solid ${(props) => props.theme.colors.gray.gray400};
`;
const NavTitle = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 49.7rem;
  color: ${(props) => props.theme.colors.gray.gray700};
  text-align: center;

  ${(props) => props.theme.fontStyles.headline.headlineBold};
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 700;

  &:hover {
    color: ${(props) => props.theme.colors.purple.purple600};
  }
`;

//Banner
const Banner = styled.div`
  display: flex;
  flex-direction: column;
  height: 50rem;
  width: 100vw;
  background-size: cover;

  justify-content: center;
  align-items: center;
`;
const BannerTitle = styled.div`
  background: linear-gradient(
    89deg,
    #00ffb2 -4.79%,
    #00f0ff 9.44%,
    #0da8ff 25.34%,
    #0047ff 42.68%,
    #bd00ff 85.58%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-align: center;
  font-size: 6.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: 155%; /* 100.75px */
`;
const BannerSubTitle = styled.div`
  color: var(--Gray-1100, #1a1a1a);
  text-align: center;
  font-size: 2.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: 155%; /* 43.4px */

  padding-bottom: 5rem;
  padding-top: 2rem;
`;

//TopBar

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 4.5rem;
  padding-right: 3rem;
  padding-top: 1.7rem;
  padding-bottom: 1.7rem;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray.gray300};

  background-color: ${(props) => props.theme.colors.gray.gray100};
`;
const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
`;
