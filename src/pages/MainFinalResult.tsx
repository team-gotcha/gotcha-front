import React from 'react';
import styled from 'styled-components';
import FinalApplierStack from '../components/main/FinalApplierStack';

const MainFinalResult = () => {
  const dummyData = [
    {
      title: '가차린',
      score: '17.2 / 20',
      ranking: '2위',
      keyword: ['다양한 경험', '꼼꼼한'],
    },
    {
      title: '가차린',
      score: '17.2 / 20',
      ranking: '2위',
      keyword: ['다양한 경험', '꼼꼼한'],
    },
    {
      title: '가차린',
      score: '17.2 / 20',
      ranking: '2위',
      keyword: ['다양한 경험', '꼼꼼한'],
    },
    {
      title: '가차린',
      score: '17.2 / 20',
      ranking: '2위',
      keyword: ['다양한 경험', '꼼꼼한'],
    },
    {
      title: '가차린',
      score: '17.2 / 20',
      ranking: '2위',
      keyword: ['다양한 경험', '꼼꼼한'],
    },
  ];

  return (
    <Wrapper>
      <FinalBoard>
        <TopBar>
          <Title>면접 상태입력</Title>
          <SubTitle>세부면접 폴더</SubTitle>
        </TopBar>
        {dummyData.map((data, index) => (
          <FinalApplierStack key={index} {...data} />
        ))}
      </FinalBoard>
    </Wrapper>
  );
};

export default MainFinalResult;

const Wrapper = styled.div`
  display: flex;

  padding: 5rem;
`;

const TopBar = styled.div`
  width: 100%;
  height: 5.6rem;

  border-radius: 12px 12px 0px 0px;
  background: ${(props) => props.theme.colors.purple.purple400};
  box-shadow: 0px 6px 10px 2px rgba(192, 214, 255, 0.25);

  display: flex;
  align-items: center;
  padding-left: 4rem;
  gap: 1.6rem;
`;
const Title = styled.div`
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;

  color: ${(props) => props.theme.colors.purple.purple800};
  ${(props) => props.theme.fontStyles.title.titleBold};
`;
const SubTitle = styled.div`
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;

  color: ${(props) => props.theme.colors.purple.purple800};
  ${(props) => props.theme.fontStyles.body.bodyRegular};
`;
const FinalBoard = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 2rem;
  border: 1px solid var(--Gray-300, #e6e6e6);
  background: var(--Gray-100, #fff);

  width: 100%;
  overflow: hidden;
`;
