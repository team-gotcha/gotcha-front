import React, { useState, useRef } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import useClickOutside from "../../hooks/useClickOutside";
import ExpandMoreIcon from "../../assets/icons/ExpandMoreIcon";

//components
import DropDownQ from "./DropDownQ";

interface DropDownBoxProps {
  questions: Array<{ id: number; totalScore: number }>;
  setQuestionId?: (selectedId: number) => void;
}

const DropDownQBox = ({ questions, setQuestionId }: DropDownBoxProps) => {
  const [isDropdownView, setDropdownView] = useState(false);
  const [selectedId, setSelectedId] = useState<number>(
    questions[0] ? questions[0].id : null
  );
  const [selectedScore, seSelectedScore] = useState<number>();
  const dropdownRef = useRef<HTMLLabelElement>(null);

  useClickOutside(dropdownRef, () => {
    if (isDropdownView) {
      setDropdownView(false);
    }
  });

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView);
  };

  const handleSelect = (id: number, totalScore: number) => {
    setSelectedId(id);
    setQuestionId(id);
    seSelectedScore(totalScore);
    setDropdownView(false);
  };
  return (
    questions && (
      <Wrapper>
        <Container onMouseDown={handleClickContainer} ref={dropdownRef}>
          <div>질문 {selectedId}</div>
          <ExpandMoreIcon fill="#3733ff" />
        </Container>
        <Comments>
          평가 점수가 <span>{questions[0]?.totalScore}점</span>으로 가장 높은
          질문입니다.
        </Comments>
        {isDropdownView && (
          <DropDownQ
            selectedOption={selectedId}
            handleSelect={handleSelect}
            options={questions}
          />
        )}
      </Wrapper>
    )
  );
};

export default DropDownQBox;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  gap: 2.2rem;
  cursor: pointer;
`;

const Container = styled.label`
  width: 10rem;
  height: 3rem;
  padding: 0.5rem 0.625rem 0.5rem 1rem;

  border-radius: 1.25rem;
  border: 1px solid var(--purple-600, #3733ff);
  background: var(--Gray-100, #fff);
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) => props.theme.fontStyles.body.bodyRegular};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;

  color: var(--purple-600, #3733ff);
`;

const Comments = styled.div`
  word-break: keep-all;
  color: var(--Gray-800, #666);

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 155%; /* 24.8px */
  letter-spacing: -0.048px;

  span {
    color: var(--purple-600, #3733ff);

    font-weight: 500;
  }
`;
