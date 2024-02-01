import React, { useState } from 'react';
import styled from 'styled-components';
import CommonButton from '../common/CommonButton';
interface FinalApplierStackProps {
  id?: number;
  name?: string;
  score?: string;
  rank?: string;
  keywords?: Array<string>;
  favorite?: boolean;
  //wss
  handlePub?: (isPass: boolean, applicantId: number) => void;
  isSocketOpen?: boolean;
  socket?: object;
  isPass?: boolean;
}
const FinalApplierStack = ({ ...props }: FinalApplierStackProps) => {
  const [isButtonClicked, setIsButtonClicked] = useState(props.isPass);
  const handleButtonClick = () => {
    //wss결과 전송
    props.handlePub(!isButtonClicked, props.id);
    setIsButtonClicked(!isButtonClicked);
  };
  return (
    <Wrapper>
      <Circle />
      <Title>{props.name}</Title>
      <Score>{props.score}</Score>
      <Comment>
        전체 <SubTitle>{props.rank}위</SubTitle>인 면접자 입니다.
        <KeywordList>
          {props.keywords.map((keyword, index) => (
            <SubTitle key={index}>{keyword}</SubTitle>
          ))}
        </KeywordList>
        의 키워드를 가지고 있어요.
      </Comment>
      {isButtonClicked ? (
        <CommonButton
          color="lineBlue"
          disabled={true}
          size="small"
          children="합격 철회 완료"
        />
      ) : (
        <CommonButton
          color="lineGray"
          size="small"
          children="합격 철회"
          onClick={handleButtonClick}
        />
      )}
    </Wrapper>
  );
};

export default FinalApplierStack;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 5rem;

  justify-content: space-between;
  align-items: center;
  background-color: white;

  padding-left: 5rem;
  padding-right: 2rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid #e6e6e6;
`;

const Circle = styled.div`
  background-color: ${(props) => props.theme.colors.purple.purple100};
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
`;

const Comment = styled.div`
  color: ${(props) => props.theme.colors.gray.gray1100};

  ${(props) => props.theme.fontStyles.subtitle.subtitleRegular};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;

  width: 70rem;
`;

const Title = styled.div`
  color: ${(props) => props.theme.colors.purple.purple600};

  ${(props) => props.theme.fontStyles.subtitle.subtitleBold};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
`;

const Score = styled.span`
  color: ${(props) => props.theme.colors.gray.gray1100};

  ${(props) => props.theme.fontStyles.subtitle.subtitleRegular};

  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
`;

const SubTitle = styled.span`
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;

  color: ${(props) => props.theme.colors.purple.purple600};
  ${(props) => props.theme.fontStyles.subtitle.subtitleBold};
`;

const KeywordList = styled.span`
  // 키워드 스타일 정의
  gap: 1rem;
`;
