import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FinalApplierStack from '../components/main/FinalApplierStack';
import { useGetPassApplicants } from '../apis/get/useGetPassApplicants';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/userInfo';

import { Client, Stomp } from '@stomp/stompjs';
import CommonButton from '../components/common/CommonButton';
import { usePostSendPassEmail } from '../apis/post/usePostSendPassEmail';

const MainFinalResult = () => {
  const [applicantsList, setApplicantsList] = useState([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  const location = useLocation();
  const { pathname } = location;
  let interview_id = '';
  let project_id = '';
  // pathname에서 interview_id 또는 project_id 추출
  const pathSegments = pathname.split('/');
  if (pathSegments.includes('result')) {
    const index = pathSegments.indexOf('result');
    interview_id = pathSegments[index + 1];
  } else if (pathSegments.includes('project')) {
    const index = pathSegments.indexOf('project');
    project_id = pathSegments[index + 1];
  }

  //custom-hook
  const fetchedData = useGetPassApplicants(Number(interview_id));
  const fetchEmail = usePostSendPassEmail();
  useEffect(() => {
    if (!fetchedData.isLoading) {
      setApplicantsList(fetchedData.passApplicants);
    }
  }, [fetchedData.isLoading, interview_id]);

  useEffect(() => {
    if (interview_id !== '') {
      const matchingInterview = userInfo.projects
        .flatMap((project) => project.interviews)
        .find(
          (interview) => interview.interviewId === parseInt(interview_id, 10)
        );

      setSubtitle(matchingInterview ? matchingInterview.interviewName : '');
      const matchingProject = userInfo.projects.find((project) =>
        project.interviews.some(
          (interview) => interview.interviewId === parseInt(interview_id, 10)
        )
      );
      if (matchingProject) {
        setTitle(matchingProject.projectName);
      } else {
        setTitle('세오스 19기');
      }
    } else {
      setSubtitle('프론트');
    }
  }, [interview_id, userInfo]);

  /**
   * 웹소켓 파트
   */
  const token = localStorage.getItem('accessToken');
  const [isPassArr, setIsPassArr] = useState([]);
  const [isSocketOpen, setIsSocketOpen] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  //클라이언트 객체 생성
  const socket = new Client({
    brokerURL: `wss://gotchaa.shop/ws`,
    debug: function (str) {
      console.log(str);
    },
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000, // 자동 재 연결
    heartbeatIncoming: 3000,
    heartbeatOutgoing: 3000,
  });
  //메세지 보내기
  const handlePubResult = (isPass: boolean, applicantId: number) => {
    const strResultBody = isPass
      ? JSON.stringify({ value: 'FAIL' })
      : JSON.stringify({ value: 'FAIL' });

    console.log(strResultBody);

    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/pub/applicant/${applicantId}`,
        body: strResultBody,
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  };
  //메세지 받기
  const handleSubResult = (message: any, applicantId: number) => {
    if (message.body) {
      const parsedBody = JSON.parse(message.body);
      console.log(applicantId + message.body);

      setIsPassArr((prevResults) => {
        return {
          ...prevResults,
          [applicantId]: parsedBody.value === 'PASS',
        };
      });
    } else {
      console.log('got empty message');
    }
  };

  //연결시 실행할 함수
  socket.onConnect = (frame) => {
    console.log('소켓 연결 성공');
    setIsSocketOpen(true);
    applicantsList.forEach(function (result) {
      console.log('열려라' + result.id);
      socket.subscribe(
        `/sub/applicant/${result.id}`,
        (message: any) => handleSubResult(message, result.id),
        {
          Authorization: `Bearer ${token}`,
        }
      );
    });
  };

  socket.onStompError = function (frame) {
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };

  useEffect(() => {
    console.log('소켓 연결 시작');
    setStompClient(socket);
    socket.activate();
    return () => {
      //unmount
      console.log('소켓 연결 끝');
      socket.deactivate();
      setIsSocketOpen(false);
      setStompClient(null);
    };
  }, []);

  useEffect(() => {
    if (applicantsList.length !== 0 && isSocketOpen) {
      console.log('연결');
      console.log(applicantsList);
      const newIsPassArr = applicantsList.reduce((acc, result) => {
        acc[result.applicantId] = false;
        return acc;
      }, {});
      setIsPassArr(newIsPassArr);
      socket.activate();
    }
  }, [applicantsList, isSocketOpen]);

  useEffect(() => {
    console.log(`냥냥냥냥냥`);
    console.log(isPassArr);
  }, [isPassArr]);

  return (
    <Wrapper>
      <FinalBoard>
        <TopBar>
          <RowBox>
            <Title>{title}</Title>
            <SubTitle>{subtitle}</SubTitle>
          </RowBox>
          <div>
            <CommonButton
              color="fillBlue"
              size="small"
              children="합격자 메일 발송"
              onClick={() => {
                fetchEmail.sendPassEmail(Number(interview_id));
              }}
            />
          </div>
        </TopBar>
        {applicantsList.map((data, index) => (
          <FinalApplierStack
            key={index} //wss
            handlePub={handlePubResult}
            isSocketOpen={isSocketOpen}
            socket={socket}
            isPass={isPassArr[data.applicantId]}
            {...data}
          />
        ))}
      </FinalBoard>
    </Wrapper>
  );
};

export default MainFinalResult;

const Wrapper = styled.div`
  display: flex;

  padding: 5rem;
`;
const RowBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

const TopBar = styled.div`
  width: 100%;
  height: 5.6rem;

  border-radius: 12px 12px 0px 0px;
  background: ${(props) => props.theme.colors.purple.purple400};
  box-shadow: 0px 6px 10px 2px rgba(192, 214, 255, 0.25);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 4rem;
  gap: 1.6rem;

  padding-right: 4rem;
`;
const Title = styled.div`
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;

  color: ${(props) => props.theme.colors.purple.purple800};
  ${(props) => props.theme.fontStyles.title.titleBold};
`;
const SubTitle = styled.div`
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;

  color: ${(props) => props.theme.colors.purple.purple800};
  ${(props) => props.theme.fontStyles.body.bodyRegular};
`;
const FinalBoard = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 2rem;
  border: 1px solid var(--Gray-300, #e6e6e6);
  background: var(--Gray-100, #fff);

  width: 100%;
  overflow: hidden;
`;
