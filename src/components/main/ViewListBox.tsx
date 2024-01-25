import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetApplicants } from '../../apis/get/useGetApplicants';
import ViewListStack from './ViewListStack';
import { useNavigate } from 'react-router-dom';
interface ViewListBoxProps {
  interview_id?: number;
  isEmptyNeed?: boolean;
}
const ViewListBox = ({ ...props }: ViewListBoxProps) => {
  const [applicantsList, setApplicantsList] = useState([]);
  const navigate = useNavigate();
  //custom -hook
  const fetchedData = useGetApplicants(Number(props.interview_id));
  useEffect(() => {
    if (!fetchedData.isLoading) {
      setApplicantsList(fetchedData.applicants);
    }
  }, [fetchedData.isLoading, props.interview_id]);

  return (
    <StackWrapper>
      {(props.isEmptyNeed || applicantsList.length === 0) && (
        <ViewListStack
          isEmpty={true}
          onClick={() => navigate(`/ready/${props.interview_id}`)}
        />
      )}

      {applicantsList.map((applicant, index) => (
        <ViewListStack key={index} isEmpty={false} applicantData={applicant} />
      ))}
    </StackWrapper>
  );
};

export default ViewListBox;

// Board

const ViewFinalStackFooter = styled.div`
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid var(--purple-100, #f3f2ff);
  background: var(--Gray-100, #fff);
`;

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
const BoardBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 30%;
`;
const BoardStackTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 2.7rem;
  padding-right: 3rem;
  align-items: center;

  height: 4.8rem;
  width: 100%;

  margin-bottom: 1.2rem;
  color: ${(props) => props.theme.colors.gray.gray600};
  ${(props) => props.theme.fontStyles.subtitle.subtitleRegular};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;

  border-radius: 0.8rem;
  border: 1px solid ${(props) => props.theme.colors.purple.purple100};
  background: ${(props) => props.theme.colors.gray.gray100};
`;
const AddApplierButton = styled.button`
  color: ${(props) => props.theme.colors.purple.purple600};
  ${(props) => props.theme.fontStyles.caption.captionRegular};
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
`;

const ViewFinalStack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding-top: 2rem;

  width: 100%;
  flex-shrink: 0;
  gap: 0.5rem;

  border-radius: 0.75rem 0.75rem 0rem 0rem;
  border: 1px solid ${(props) => props.theme.colors.purple.purple200};
  background-color: ${(props) => props.theme.colors.gray.gray100};
`;
const FinalStackTitle = styled.div`
  color: ${(props) => props.theme.colors.purple.purple600};
  ${(props) => props.theme.fontStyles.title.titleMedium};
  font-size: 2rem;
  font-style: normal;
  font-weight: 500;
`;
const FinalStackSubtitle = styled.div`
  color: ${(props) => props.theme.colors.gray.gray600};
  ${(props) => props.theme.fontStyles.caption.captoionRegular};
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 400;
`;

// List

const NotiBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 1.4rem;
  margin-bottom: 2.8rem;
`;
const AddCommonQuestionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 2rem;
  align-items: center;
  gap: 0.4rem;

  ${(props) => props.theme.fontStyles.button.buttonLarge};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
`;

const ViewListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
`;
const StackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1.2rem;
  overflow: hidden;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4.4rem;
`;

const ProjectEmptyComment = styled.div`
  color: ${(props) => props.theme.colors.purple.purple700};
  ${(props) => props.theme.fontStyles.title.titleRegular};
  font-size: 2rem;
  font-weight: 400;
`;
