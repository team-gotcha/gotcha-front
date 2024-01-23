import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { styled } from "styled-components";

import info from "../../assets/images/InfoIcon-gray.svg";
import CloseIcon from "../../assets/icons/CloseIcon";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userDetailInfoState } from "../../recoil/cardview";

const KeywordBox = ({ modify = true }) => {
  const userDetailInfo = useRecoilValue(userDetailInfoState);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputWidth, setInputWidth] = useState<number>(20);

  console.log(userDetailInfo, userDetailInfo?.traitKeywords);

  const showInput = () => {
    setIsInputVisible(true);
  };

  const hideInput = () => {
    setIsInputVisible(false);
    setInputValue("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setInputWidth(event.target.value.length * 10 + 20);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (inputValue.trim() !== "") {
        setKeywords((prevKeywords) => [...prevKeywords, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const handleRemoveKeyword = (index: number) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  return (
    <Container>
      <TitleDiv>
        <KeyTitle>키워드</KeyTitle>
        {modify && <InfoIcon src={info} />}
      </TitleDiv>
      <KeywordDiv>
        {modify
          ? keywords.map((keyword, index) => (
              <Keyword key={index}>
                {keyword}
                <CloseIcon
                  width={16}
                  height={16}
                  fill="#999999"
                  onClick={() => handleRemoveKeyword(index)}
                />
              </Keyword>
            ))
          : userDetailInfo?.traitKeywords.map((keyword, index) => (
              <Keyword key={index}>{keyword}</Keyword>
            ))}
        {modify &&
          (isInputVisible ? (
            <>
              <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                onBlur={hideInput}
                autoFocus
                style={{ width: `${inputWidth}px` }}
              />
            </>
          ) : (
            <InputIcon onClick={showInput}>+</InputIcon>
          ))}
      </KeywordDiv>
    </Container>
  );
};

export default KeywordBox;

const Container = styled.div``;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  margin-bottom: 0.8rem;
`;

const KeyTitle = styled.div`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.036px;
`;

const InfoIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const KeywordDiv = styled.div`
  display: flex;
  align-items: center;
  width: 30rem;
  gap: 0.8rem;

  flex-wrap: wrap;
`;

const Keyword = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
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

const Input = styled.input`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  border: 0.4px solid var(--purple-100, #f3f2ff);
  background: var(--Gray-200, #f6f6f6);
`;

const InputIcon = styled.div`
  display: flex;
  padding: 0.2rem 1rem;
  justify-content: center;
  align-items: center;

  color: var(--Gray-1100, #1a1a1a);
  text-align: center;

  border-radius: 2rem;
  border: 0.4px solid var(--purple-100, #f3f2ff);
  background: var(--Gray-200, #f6f6f6);

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.042px;
`;
