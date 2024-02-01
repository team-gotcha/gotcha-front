import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../components/layout/Header';

import onboarding from '../assets/images/onboarding1.svg';
import onboarding1 from '../assets/videos/onboarding1.mp4';
import OnboardEmail from './OnboardEmail';
import { usePostAddProject } from '../apis/post/usePostAddProject';

const Onboard = () => {
  const navigate = useNavigate();
  const [interviewName, setInterviewName] = useState('');
  const [emailList, setEmailList] = useState(['']);

  const handleEmailListChange = (updatedEmailList: string[]) => {
    setEmailList(updatedEmailList);
  };

  //custom-hook
  const fetchData = usePostAddProject();

  /**
   * project 데이터 전송해 생성하는 기능
   */
  const handleSubmit = () => {
    fetchData.addProject({
      name: interviewName,
      emails: emailList,
    });
  };

  useEffect(() => {
    if (fetchData.isSuccess) {
      navigate('/main/project/1');
    } else {
      navigate('/onboarding/2');
    }
  }, [fetchData.isSuccess]);

  //페이지 이동
  const { id } = useParams();
  return (
    <>
      {id === '1' && (
        <>
          <Header />
          <Wrapper>
            <Container>
              <TopBox>
                <Step src={onboarding} />
                <TextDiv>
                  <Title>첫번째 프로젝트의 제목을 알려주세요.</Title>
                  <Comments>
                    회원님과 팀이 현재 지행하는 면접은 무엇인가요?
                  </Comments>
                </TextDiv>
                <Input
                  placeholder="면접 이름"
                  value={interviewName}
                  onChange={(e) => setInterviewName(e.target.value)}
                />
              </TopBox>
              <BtnDiv>
                <BeforeBtn onClick={() => navigate('/')}>이전으로</BeforeBtn>
                <NextBtn onClick={() => navigate('/onboarding/2')}>
                  다음으로
                </NextBtn>
              </BtnDiv>
              <ContentBox>
                <ProjText>{interviewName}</ProjText>
                <Video muted autoPlay>
                  <source src={onboarding1} type="video/mp4" />
                </Video>
              </ContentBox>
            </Container>
          </Wrapper>
        </>
      )}
      {id === '2' && (
        <>
          <OnboardEmail
            emailList={emailList}
            onEmailListChange={handleEmailListChange}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </>
  );
};

export default Onboard;

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

const Input = styled.input`
  display: flex;
  width: 55%;
  height: 5%;
  padding: 8px 16px;
  align-items: center;
  flex-shrink: 0;

  margin: 6.5% 0 10rem;

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
  position: relative;
  width: 100%;
  background-color: #fff;
`;

const ProjText = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  top: 10.5%;
  left: 35%;
  z-index: 10;

  width: 15%;
  height: 5%;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-size: 1.5rem;
  font-style: normal;
  font-weight: 200;
  color: #000;
  letter-spacing: 0.5px;
`;

const Video = styled.video`
  border: 1px solid #e6e6e6;
  outline: none;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;

  width: 100%;
  height: 60%;
  border-radius: 24px;
`;
