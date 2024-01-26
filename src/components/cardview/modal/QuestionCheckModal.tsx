import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import QuestionItemDrag from "../QuestionItemDrag";
import InfoIcon from "../../../assets/icons/InfoIcon";

import info from "../../../assets/images/InfoIcon-blue.svg";

import { useGetAllEvaluations } from "../../../apis/get/useGetAllEvaluations";
import { useGetEvalQuestion } from "../../../apis/get/useGetEvalQuestion";
import { useGetRankingPoint } from "../../../apis/get/useGetRankingPoint";
import { useGetCheckQuestions } from "../../../apis/get/useGetCheckQuestions";

interface BaseModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  applicantId: number;
}

const QuestionCheckModal = ({
  isOpen,
  setIsOpen,
  setIsOpenModal,
  applicantId,
}: BaseModalProps) => {
  const applicant_id: number = applicantId;
  const [isHovered, setIsHovered] = useState(false);
  const [items, setItems] = useState([]);

  //custom hook
  const checkQuestionData = useGetCheckQuestions(applicant_id);

  useEffect(() => {
    if (!checkQuestionData.isLoading) {
      console.log("확인 질문 데이터 세팅", checkQuestionData);
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
