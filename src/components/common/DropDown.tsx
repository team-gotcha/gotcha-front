import React, { useState } from 'react';
import { styled, css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface DropDownProps {
  selectedOption: string;

  handleSelect: (option: string) => void;
}

const options = ['활동 유형', '어쩌구', '저쩌구'];

const DropDown = ({ selectedOption, handleSelect }: DropDownProps) => {
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
  top: 5.5rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  border-radius: 1.6rem;
  background: #fff;
`;

const ListItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  width: 12rem;
  height: 4.8rem;
  justify-content: center;
  align-items: center;

  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: #3733ff;
    `};

  cursor: pointer;
`;
