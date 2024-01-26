import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { styled } from "styled-components";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  interviewersDataState,
  userDetailInfoState,
} from "../../recoil/cardview";
import { useGetViewer } from "../../apis/get/useGetViewer";

interface Interviewer {
  id: number;
  email: string;
  name: string;
}

const InterviewerBox = ({ modify = true }) => {
  const setInterviewerData = useSetRecoilState(interviewersDataState);
  const viewerData = useRecoilValue(interviewersDataState);
  const userDetailInfo = useRecoilValue(userDetailInfoState);

  const [viewers, setViewers] = useState([]);
  const [pickedViewers, setPickedViewers] = useState<Interviewer[]>([]);
  const [isDropdownView, setDropdownView] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const interviewerData = useGetViewer(3); //interview-id 넣어줘야함

  useEffect(() => {
    if (modify) {
      const newData = interviewerData.interviewerInfo || [];
      setViewers(newData);
    } else {
      const newData = userDetailInfo.interviewerNames || [];
      setViewers(newData);
    }
  }, [!interviewerData.isLoading]);

  useEffect(() => {
    console.log(viewerData);
  }, [pickedViewers, viewerData]);

  const handleToggleSelection = (option: Interviewer) => {
    const isSelected = selectedOptions.includes(option.id);

    if (isSelected) {
      const newSelectedOptions = selectedOptions.filter(
        (id) => id !== option.id
      );
      setPickedViewers((prevPickedViewers) =>
        prevPickedViewers.filter(
          (pickedOption) => pickedOption.id !== option.id
        )
      );
      setSelectedOptions(newSelectedOptions);
      setInterviewerData((prevViewerData) => [
        ...prevViewerData.filter(
          (pickedOption) => pickedOption.id !== option.id
        ),
      ]);
    } else {
      setPickedViewers((prevPickedViewers) => [...prevPickedViewers, option]);
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        option.id,
      ]);
      setInterviewerData((prevViewerData) => [
        ...prevViewerData,
        { id: option.id },
      ]);
    }
  };

  return (
    <Container>
      <TopDiv>
        <KeyTitle>면접관</KeyTitle>
        {modify && (
          <DropdownDiv>
            <SelectBar onClick={() => setDropdownView(!isDropdownView)}>
              면접관 추가
            </SelectBar>
            {isDropdownView && (
              <Wrapper>
                {viewers &&
                  viewers.map((option: Interviewer) => (
                    <ListItem
                      key={option.id}
                      isSelected={selectedOptions.includes(option.id)}
                      onClick={() => handleToggleSelection(option)}
                    >
                      {option.name}
                    </ListItem>
                  ))}
              </Wrapper>
            )}
          </DropdownDiv>
        )}
      </TopDiv>
      <KeywordDiv>
        {pickedViewers.map((item: Interviewer) => (
          <Keyword key={item.id}>{item.name}</Keyword>
        ))}
      </KeywordDiv>
    </Container>
  );
};

export default InterviewerBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
`;

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const KeyTitle = styled.div`
  color: var(--purple-600, #3733ff);
  width: 5.5rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.036px;
`;

const DropdownDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SelectBar = styled.div`
  display: flex;
  width: 238px;
  height: 24px;
  padding: 2px 10px;
  justify-content: flex-start;
  align-items: center;
  flex-shrink: 0;

  border-radius: 4px;
  border: 0.4px solid var(--purple-100, #f3f2ff);
  background: var(--Gray-200, #f6f6f6);

  color: var(--Gray-600, #999);

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.042px;

  cursor: pointer;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 2.9rem;
  display: flex;
  width: 238px;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  border-radius: 12px;
  border: 1px solid var(--purple-200, #e6e5ff);
  background: var(--Gray-100, #fff);

  box-shadow: 0px 0px 6px 2px rgba(215, 215, 215, 0.15);
  z-index: 100;
`;

const ListItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  width: 100%;
  padding: 8px 16px;
  justify-content: flex-start;
  align-items: center;

  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;

  color: ${({ isSelected }) => (isSelected ? "#3733ff" : "#808080")};

  cursor: pointer;
`;

const KeywordDiv = styled.div`
  display: flex;
  align-items: center;
  width: 30rem;
  gap: 0.8rem;
  margin-left: 8.5rem;

  flex-wrap: wrap;
`;

const Keyword = styled.div`
  display: flex;
  height: 26px;
  padding: 0.2rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  color: var(--Gray-1100, #1a1a1a);
  border-radius: 2rem;
  border: 0.4px solid var(--purple-100, #f3f2ff);
  background: var(--blue-100, #f4f7ff);

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;
