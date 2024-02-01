import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

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
  let { user_id } = useParams();
  let { interview_id } = useParams();
  const dropdownRef = useRef(null);
  const InterviewIdNumber: number = parseInt(interview_id, 10);
  const setInterviewerData = useSetRecoilState(interviewersDataState);
  const userDetailInfo = useRecoilValue(userDetailInfoState);

  const [viewers, setViewers] = useState([]);
  const [pickedViewers, setPickedViewers] = useState<Interviewer[]>([]);
  const [isDropdownView, setDropdownView] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [resultViewers, setResultViewers] = useState<string[]>([]);

  const interviewerData = useGetViewer(InterviewIdNumber);

  useEffect(() => {
    if (modify) {
      const newData = interviewerData.interviewerInfo || [];
      setViewers(newData);
    } else {
      console.log(userDetailInfo.interviewerNames);
      const newData = userDetailInfo.interviewerNames || [];
      setResultViewers(newData);
    }
  }, [!interviewerData.isLoading, userDetailInfo, user_id]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownView(false); // Close the dropdown
      }
    };

    if (isDropdownView) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownView]);

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
        <KeyTitle>면접관 </KeyTitle>
        {modify ? (
          <DropdownDiv ref={dropdownRef}>
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
        ) : (
          <ResultBox>
            {resultViewers.map((item: string, index) => (
              <Keyword key={index}>{item}</Keyword>
            ))}
          </ResultBox>
        )}
      </TopDiv>
      <KeywordDiv>
        {modify &&
          pickedViewers.map((item: Interviewer) => (
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
  width: 100%;
`;

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;
  width: 100%;
`;

const KeyTitle = styled.div`
  color: var(--purple-600, #3733ff);
  width: 5.2rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.036px;
  white-space: nowrap;
`;

const DropdownDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SelectBar = styled.div`
  display: flex;
  /* width: 10vw; */
  width: 100%;

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
  white-space: nowrap;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 2.9rem;
  display: flex;
  /* width: 10vw; */
  width: 100%;

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
  width: 14.5vw;
  gap: 0.8rem;
  padding-left: 6.8rem;

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

const ResultBox = styled.div`
  display: flex;
  align-items: center;
  width: 10vw;

  gap: 0.8rem;

  flex-wrap: wrap;
`;
