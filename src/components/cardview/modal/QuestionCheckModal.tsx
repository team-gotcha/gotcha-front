import React, { useState, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import QuestionItemDrag from '../QuestionItemDrag';
import InfoIcon from '../../../assets/icons/InfoIcon';

import info from '../../../assets/images/InfoIcon-blue.svg';
import * as StompJs from '@stomp/stompjs';

import { useGetAllEvaluations } from '../../../apis/get/useGetAllEvaluations';
import { useGetEvalQuestion } from '../../../apis/get/useGetEvalQuestion';
import { useGetRankingPoint } from '../../../apis/get/useGetRankingPoint';
import { useGetCheckQuestions } from '../../../apis/get/useGetCheckQuestions';

interface BaseModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface QuestionProps {
  questionId: number;
  questionBody: {
    value: Number | String | null;
    type: 'ORDER' | 'IMPORTANCE' | 'CONTENT' | 'DELETE';
  };
}

const QuestionCheckModal = ({
  isOpen,
  setIsOpen,
  setIsOpenModal,
}: BaseModalProps) => {
  let { user_id } = useParams();
  const userIdNumber: number = parseInt(user_id, 10);
  const [isHovered, setIsHovered] = useState(false);
  const [items, setItems] = useState([]);

  //custom hook
  const checkQuestionData = useGetCheckQuestions(userIdNumber);

  useEffect(() => {
    if (!checkQuestionData.isLoading) {
      console.log('확인 질문 데이터 세팅', checkQuestionData);
      setItems(checkQuestionData.checkQuestion);
    }
  }, [!checkQuestionData.isLoading]);

  // console.log();

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const draggedItem = items[dragIndex];
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, draggedItem);
      return newItems;
    });
  };

  const handleBtn = () => {
    setIsOpenModal(true);
    setIsOpen(!isOpen);
  };

  /**
   * 웹소켓 파트
   */
  const token = localStorage.getItem('accessToken');

  //클라이언트 객체 생성
  const socket = new StompJs.Client({
    brokerURL: `wss://gotchaa.shop/ws`,
    debug: function (str) {
      console.log(str);
    },
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    reconnectDelay: 5000, // 자동 재 연결
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  //메세지 보내기
  const handlePubQuestion = ({ questionId, questionBody }: QuestionProps) => {
    const strQeustionBody = JSON.stringify(questionBody);
    socket.publish({
      destination: `/pub/question/${questionId}`,
      body: strQeustionBody,
      headers: { Authorization: `Bearer ${token}` },
    });
  };
  //메세지 받기 연결
  const handleConnectSubQuestion = (questionId: number) => {
    socket.subscribe(`/sub/question/${questionId}`, handleGetSubQuestion, {
      Authorization: `Bearer ${token}`,
    });
  };
  //메세지 받으면 실행되는 콜백함수
  const handleGetSubQuestion = (message: any) => {
    if (message.body) {
      alert('got message with body ' + message.body);
    } else {
      alert('got empty message');
    }
  };

  //연결시 실행할 함수
  socket.onConnect = (frame) => {
    console.log('소켓 연결 성공');

    //test
    // handlePubQuestion({
    //   questionId: 42,
    //   questionBody: { value: '수정', type: 'CONTENT' },
    // });
    // handleConnectSubQuestion(42);

    //item당 열기
    items.forEach(function (item) {
      //구독 소켓 연결
      handleConnectSubQuestion(item.id);
    });
  };

  socket.onStompError = function (frame) {
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
  };

  useEffect(() => {
    //mount
    console.log('소켓 연결 시작');
    socket.activate();
    return () => {
      //unmount
      console.log('소켓 연결 끝');
      socket.deactivate();
    };
  }, []);

  //useEffect(() => {}, [items]);

  return (
    <>
      {isOpen && (
        <Container>
          <Topbar>
            <InfoBox>
              <Title>갓차린 면접자 질문 확인</Title>
              <Info
                src={info}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              {isHovered && (
                <InfoPopup>
                  면접 질문을 드래그해서 순서를 변경할 수 있어요.
                  <br />
                  여기서 정한 질문 순서대로 면접 중 질문이 나타나요.
                </InfoPopup>
              )}
            </InfoBox>
            <StartBtn onClick={handleBtn}>면접 전형 시작</StartBtn>
          </Topbar>
          <Box>
            <QuestionContainer>
              <DndProvider backend={HTML5Backend}>
                {items.map((item, index) => (
                  <QuestionItemDrag
                    key={item?.id}
                    isCommon={item?.common}
                    content={item?.content}
                    importance={item.importance}
                    index={index}
                    moveItem={moveItem}
                  />
                ))}
              </DndProvider>
            </QuestionContainer>
          </Box>
        </Container>
      )}
    </>
  );
};

export default QuestionCheckModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  border-radius: 1.2rem;
  min-width: 50rem;
  overflow: hidden;
  z-index: 200;
`;

const Topbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5.6rem;
  padding: 0 2rem 0 4rem;

  border-radius: 1.2rem 1.2rem 0px 0px;
  border: 1px solid var(--purple-300, #cdccff);
  background: var(--blue-200, #e5ecff);
  box-shadow: 0px 6px 10px 2px rgba(192, 214, 255, 0.25);
`;

const InfoBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const Title = styled.div`
  color: var(--purple-600, #3733ff);

  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
  letter-spacing: -0.06px;
`;

const Info = styled.img`
  width: 16px;
  height: 16px;
`;

const StartBtn = styled.button`
  display: flex;
  padding: 6px 26px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 16px;
  background: var(--purple-600, #3733ff);
  color: var(--Gray-100, #fff);

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 155%; /* 21.7px */
  letter-spacing: -0.042px;

  box-shadow: 0px 0px 6px 2px rgba(215, 215, 215, 0.15);
`;
const Box = styled.div`
  padding: 2rem;
  width: 100%;
  background-color: #fff;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  padding: 0 1.2rem 0 2.1rem;
  background-color: #fff;
  border-radius: 0px 0px 1.2rem 1.2rem;

  max-height: 66.2rem;
  overflow-y: auto;

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

const InfoPopup = styled.div`
  position: absolute;
  width: 24rem;
  top: 2.6rem;
  left: 19rem;
  z-index: 80;
  display: inline-flex;
  padding: 1rem 1.4rem;
  justify-content: center;
  align-items: center;

  border-radius: 12px;
  border: 1px solid var(--Gray-300, #e6e6e6);
  background: var(--Gray-100, #fff);

  /* 회색 */
  box-shadow: 0px 0px 6px 2px rgba(215, 215, 215, 0.15);

  color: var(--Gray-600, #999);

  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 15.5px */
  letter-spacing: -0.03px;
`;
