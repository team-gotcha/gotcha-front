import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import ResultInfoItem from '../components/cardview/ResultInfoItem';

import { useGetFinApplicants } from '../apis/get/useGetFinApplicants';
import { Client, Stomp } from '@stomp/stompjs';
import { usePatchInterviewComplete } from '../apis/patch/usePatchInterviewComplete';

interface ApplicantResultProps {
  value: string;
}

const Result = () => {
  const navigate = useNavigate();
  let { interview_id } = useParams();
  const InterviewIdNumber: number = parseInt(interview_id, 10);
  const [results, setResults] = useState([]);
  const [isPassArr, setIsPassArr] = useState([]);

  const finApplicantsData = useGetFinApplicants(InterviewIdNumber);
  console.log(finApplicantsData);

  useEffect(() => {
    if (!finApplicantsData.isLoading) {
      setResults(finApplicantsData.allFinApplicants);
    }
  }, [!finApplicantsData.isLoading]);

  const [isSocketOpen, setIsSocketOpen] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  /**
   * 탈락지원자 상태 업데이트 custom-hook
   */
  const fetchData = usePatchInterviewComplete();

  const handleInterviewComplete = () => {
    console.log('소켓 연결 끝');
    socket.deactivate();
    setIsSocketOpen(false);
    setStompClient(null);

    fetchData.interviewComplete(interview_id);
    console.log('go');
    navigate(`/main/result/${interview_id}`);
  };

  /**
   * 웹소켓 파트
   */
  const token = localStorage.getItem('accessToken');

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
      ? JSON.stringify({ value: 'PASS' })
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
    results.forEach(function (result) {
      console.log('열려라' + result.applicantId);
      socket.subscribe(
        `/sub/applicant/${result.applicantId}`,
        (message: any) => handleSubResult(message, result.applicantId),
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
    if (results.length !== 0 && isSocketOpen) {
      console.log('연결');
      console.log(results);
      const newIsPassArr = results.reduce((acc, result) => {
        acc[result.applicantId] = false;
        return acc;
      }, {});
      setIsPassArr(newIsPassArr);
      socket.activate();
    }
  }, [results, isSocketOpen]);

  useEffect(() => {
    console.log(`냥냥냥냥냥`);
    console.log(isPassArr);
  }, [isPassArr]);

  return (
    <Wrapper>
      <Background />
      <Container>
        {results &&
          results.map((data, index) => (
            <ResultInfoItem
              key={index}
              data={data}
              userIdNumber={data.applicantId}
              InterviewIdNumber={InterviewIdNumber}
              //wss
              handlePub={handlePubResult}
              isSocketOpen={isSocketOpen}
              socket={socket}
              isPass={isPassArr[data.applicantId]}
            />
          ))}
        <ResultBtn onClick={handleInterviewComplete}>
          합격자 선정 완료
        </ResultBtn>
      </Container>
    </Wrapper>
  );
};

export default Result;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  height: 100%;
  overflow: hidden;

  padding-bottom: 6rem;
`;

const Background = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: var(--gray-background-gray-55, rgba(50, 50, 50, 0.55));
  backdrop-filter: blur(6px);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 0.5rem 1.35rem 0.5rem 4rem;
  margin: 4.5rem 2.8rem 4.5rem 0;

  z-index: 10;
  overflow-y: auto;
  width: 100%;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #e6e6e6; /* 스크롤바의 색상 */

    border-radius: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const ResultBtn = styled.button`
  display: flex;
  width: 60rem;
  height: 5.6rem;
  padding: 0.8rem 4.2rem;
  justify-content: center;
  align-items: center;

  border-radius: 22px;
  background: var(--purple-600, #3733ff);

  color: var(--Gray-100, #fff);

  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 28.8px */
`;
