import React, { useState, useRef } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import useClickOutside from '../../hooks/useClickOutside';

import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon';

//components
import DropDown from './DropDown';

interface DropDownBoxProps {
  options: string[];
  value: string;
  onChangeValue: (selectedOption: string) => void;
}

const DropDownBox = () => {
  const [isDropdownView, setDropdownView] = useState(false);
  const [selectedOption, setSelectedOption] = useState(' --- ');
  const dropdownRef = useRef<HTMLLabelElement>(null);

  useClickOutside(dropdownRef, () => {
    if (isDropdownView) {
      setDropdownView(false);
    }
  });

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setDropdownView(false);
  };
  return (
    <Wrapper>
      <Container onMouseDown={handleClickContainer} ref={dropdownRef}>
        <div>{selectedOption}</div>
        {/* {isDropdownView ? <Close /> : <Open />} */}
        <ExpandMoreIcon fill="#3733ff" />
      </Container>
      {isDropdownView && (
        <DropDown selectedOption={selectedOption} handleSelect={handleSelect} />
      )}
    </Wrapper>
  );
};

export default DropDownBox;

const Wrapper = styled.div`
  position: relative;
  display: flex;
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
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;

  color: var(--purple-600, #3733ff);
`;
