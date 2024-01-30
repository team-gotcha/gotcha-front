import React, { useState } from "react";
import { styled, css } from "styled-components";
import { useNavigate } from "react-router-dom";

interface DropDownProps {
  selectedOption: number;
  options?: Array<{ id: number; totalScore: number }>;
  handleSelect: (id: number, totalScore: number) => void;
}

const DropDownQ: React.FC<DropDownProps> = ({
  selectedOption,
  handleSelect,
  options,
}) => {
  return (
    <Wrapper>
      {options.map((option) => (
        <ListItem
          key={option.id}
          onMouseDown={() => handleSelect(option.id, option.totalScore)}
          isSelected={selectedOption === option.id}
        >
          질문 {option.id}
        </ListItem>
      ))}
    </Wrapper>
  );
};

export default DropDownQ;

const Wrapper = styled.div`
  position: absolute;
  top: 3.3rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  border: 1px solid var(--Gray-500, #b3b3b3);
  border-radius: 1.6rem;
  background: #fff;
  z-index: 100;
`;

const ListItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  width: 10rem;
  height: 4.8rem;
  justify-content: center;
  align-items: center;

  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;

  color: ${({ isSelected }) => (isSelected ? "#3733ff" : "#808080")};

  cursor: pointer;
`;
