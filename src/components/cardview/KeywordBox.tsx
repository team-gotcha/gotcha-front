import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { styled } from "styled-components";

import info from "../../assets/images/InfoIcon-gray.svg";
import CloseIcon from "../../assets/icons/CloseIcon";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { userDetailInfoState, userPostDataState } from "../../recoil/cardview";

const KeywordBox = ({ modify = true, title = "" }) => {
  const userDetailInfo = useRecoilValue(userDetailInfoState);
  const keywordInfo = useRecoilValue(userPostDataState);
  const setKeywordInfo = useSetRecoilState(userPostDataState);
  // const [titleValue, setTitleValue] = useState<string>("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [keywords, setKeywords] = useState<string[]>([]);
  // const [inputWidth, setInputWidth] = useState<number>(20);

  const getTitleType = () => {
    switch (title) {
      case "성향":
        return "TRAIT";
      case "스킬":
        return "SKILL";
      case "경험":
        return "EXPERIENCE";
      default:
        return "";
    }
  };

  const getTitleValue = () => {
    switch (title) {
      case "성향":
        return userDetailInfo?.traitKeywords;
      case "스킬":
        return userDetailInfo?.skillKeywords;
      case "경험":
        return userDetailInfo?.experienceKeywords;
      default:
        return userDetailInfo?.traitKeywords;
    }
  };

  const titleValue = getTitleValue();

  useEffect(() => {
    !modify && getTitleValue();
  }, []);

  const showInput = () => {
    setIsInputVisible(true);
  };

  const hideInput = () => {
    setIsInputVisible(false);
    setInputValue("");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    // setInputWidth(event.target.value.length * 10 + 20);
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
        <KeyTitle>{title} 키워드</KeyTitle>
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
          : titleValue
          ? titleValue.map((keyword, index) => (
              <Keyword key={index}>{keyword}</Keyword>
            ))
          : null}
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
                // style={{ width: `${inputWidth}px` }}
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
  width: 32.4rem;
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
