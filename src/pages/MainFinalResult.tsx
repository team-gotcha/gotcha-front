import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FinalApplierStack from '../components/main/FinalApplierStack';
import { useGetPassApplicants } from '../apis/get/useGetPassApplicants';
import { useLocation } from 'react-router-dom';

const MainFinalResult = () => {
  const [applicantsList, setApplicantsList] = useState([]);

  const location = useLocation();
  const { pathname } = location;
  let interview_id = '';
  let project_id = '';
  // pathname에서 interview_id 또는 project_id 추출
  const pathSegments = pathname.split('/');
  if (pathSegments.includes('result')) {
    const index = pathSegments.indexOf('result');
    interview_id = pathSegments[index + 1];
  } else if (pathSegments.includes('project')) {
    const index = pathSegments.indexOf('project');
    project_id = pathSegments[index + 1];
  }

  const fetchedData = useGetPassApplicants(Number(interview_id));
  useEffect(() => {
    if (!fetchedData.isLoading) {
      setApplicantsList(fetchedData.passApplicants);
    }
  }, [fetchedData.isLoading, interview_id]);

  return (
    <Wrapper>
      <FinalBoard>
        <TopBar>
          <Title>면접 상태입력</Title>
          <SubTitle>세부면접 폴더</SubTitle>
        </TopBar>
        {applicantsList.map((data, index) => (
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
