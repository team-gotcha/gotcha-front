import React, { useState, useRef } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import useClickOutside from "../../hooks/useClickOutside";
import ExpandMoreIcon from "../../assets/icons/ExpandMoreIcon";

//components
import DropDown from "./DropDown";

interface DropDownBoxProps {
  options?: Array<{ id: number; value: string; label: string }>;
  // value: string;
  onChangeValue?: (selectedOption: string) => void;

  questions?: Array<{ id: number; totalScore: number }>;
}

const DropDownBox = ({ options, questions }: DropDownBoxProps) => {
  const [isDropdownView, setDropdownView] = useState(false);
  const [selectedOption, setSelectedOption] = useState("전체");
  const [selectedLabel, seSelectedLabel] = useState("전체");
  const dropdownRef = useRef<HTMLLabelElement>(null);

  useClickOutside(dropdownRef, () => {
    if (isDropdownView) {
      setDropdownView(false);
    }
  });

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView);
  };

  const handleSelect = (id: number, value: string, label: string) => {
    setSelectedOption(value);
    seSelectedLabel(label);
    setDropdownView(false);
  };
  return (
    <Wrapper>
      <Container onMouseDown={handleClickContainer} ref={dropdownRef}>
        <div>{selectedLabel}</div>
        <ExpandMoreIcon fill="#3733ff" />
      </Container>
      {isDropdownView && (
        <DropDown
          selectedOption={selectedOption}
          handleSelect={handleSelect}
          options={options}
        />
      )}
    </Wrapper>
  );
};

export default DropDownBox;

const Wrapper = styled.div`
  position: relative;
  display: flex;
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
