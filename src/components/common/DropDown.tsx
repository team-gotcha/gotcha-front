import React, { useState } from "react";
import { styled, css } from "styled-components";
import { useNavigate } from "react-router-dom";

interface DropDownProps {
  selectedOption: string;
  options: string[];
  handleSelect: (option: string) => void;
}

const DropDown = ({
  selectedOption,
  handleSelect,
  options = ["활동 유형", "어쩌구", "저쩌구"],
}: DropDownProps) => {
  return (
    <Wrapper>
      {options.map((option: string) => (
        <ListItem
          key={option}
          onMouseDown={() => handleSelect(option)}
          isSelected={selectedOption === option}
        >
          {option}
        </ListItem>
      ))}
    </Wrapper>
  );
};

export default DropDown;

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
