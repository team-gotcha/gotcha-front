import React, { useState } from 'react';
import { styled } from 'styled-components';
import StarOffIcon from '../../assets/icons/StarOffIcon';
import CommonTag from '../common/CommonTag';
import MessageIcon from '../../assets/icons/MessageIcon';
import {
  formatDateString,
  useGetTodayDate,
  useGetTodayDateDotFormat,
} from '../../hooks/useGetTodayDate';
import StarOnIcon from '../../assets/icons/StarOnIcon';
import CommonGroupMembers from '../common/CommonGroupMembers';
import { useNavigate } from 'react-router-dom';

interface ViewListStackProps {
  isStar?: boolean; //즐찾표시 여부 api수정후 applicantData에 포함시킴
  onClick?: () => void;
  isEmpty?: boolean; //빈 스택 여부
  interviewId?: string;
  applicantData?: {
    id?: number;
    questionCount?: number;
    name?: string;
    date?: string;
    status?: string;
    interviewerEmails?: Array<string>;
    keywords?: Array<{ name?: string; type?: string }>;
  };
}

const ViewListStack = ({ ...props }: ViewListStackProps) => {
  const InterviewStateList = ['면접 준비중', '면접 진행중', '면접 전형 완료'];
  const navigate = useNavigate();
  const applicantName = props.applicantData
    ? props.applicantData.name
    : '새로운 지원자를 추가하세요!';
  const keywords = props.applicantData
    ? props.applicantData.keywords
    : [{ name: '태그' }, { name: '태그' }, { name: '태그' }];
  const questionCount = props.applicantData
    ? props.applicantData.questionCount
    : '0';
  const groupMemberList = props.applicantData
    ? props.applicantData.interviewerEmails
    : [];

  const todayDate = useGetTodayDateDotFormat();
  const dueDate = props.applicantData
    ? formatDateString(props.applicantData.date)
    : todayDate;
  let navigateRoute = '';
  let statusText;
  switch (props.applicantData?.status) {
    case 'PREPARATION':
      statusText = '면접 준비중';
      navigateRoute = 'ready';
      break;
    case 'IN_PROGRESS':
      statusText = '면접 진행중';
      navigateRoute = 'inprogress';
      break;
    case 'COMPLETION':
      statusText = '면접 전형 완료';
      navigateRoute = 'result';
      break;
    default:
      statusText = '면접 진행단계';
      navigateRoute = 'ready';
      break;
  }

  const handleApplicantClick = () => {
    if (props.applicantData?.status === 'COMPLETION') {
      navigate(`/result/${props.interviewId}`);
    } else {
      navigate(
        `/${navigateRoute}/${props.interviewId}/${props.applicantData.id}`
      );
      window.location.reload();
    }
  };

  return (
    <>
      <Wrapper
        onClick={props.isEmpty ? props.onClick : handleApplicantClick}
        statusText={statusText}
      >
        {!props.isEmpty ? (
          <ApplierName>{applicantName}</ApplierName>
        ) : (
          <ProjectEmptyComment>{applicantName}</ProjectEmptyComment>
        )}

        <TagList>
          {keywords.map((keyword, index) => (
            <CommonTag children={keyword.name} />
          ))}
        </TagList>
        <MemoBox>
          <MessageIcon width={'2.6rem'} height={'2.8rem'} />
          <MessageAlert>{questionCount}</MessageAlert>
        </MemoBox>
        <CommonGroupMembers groupMemberList={groupMemberList} showNum={5} />
        <InterviewState statusText={statusText}>{statusText}</InterviewState>
        <InterviewDate>{dueDate}</InterviewDate>
        <FavoriteState>
          {props.isStar ? <StarOnIcon /> : <StarOffIcon />}
        </FavoriteState>
      </Wrapper>
    </>
  );
};

export default ViewListStack;

const Wrapper = styled.button<{ statusText?: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
  height: 5.6rem;

  background-color: ${(props) => props.theme.colors.gray.gray100};
  border-bottom: 0.1rem solid ${(props) => props.theme.colors.purple.purple200};
  border-left: ${(props) => {
    switch (props.statusText) {
      case '면접 준비중':
        return `0.5rem solid ${props.theme.colors.blue.blue300}`;
      case '면접 진행중':
        return `0.5rem solid ${props.theme.colors.blue.blue500}`;
      case '면접 전형 완료':
        return `0.5rem solid ${props.theme.colors.blue.blue200}`;
      default:
        return `0.5rem solid ${props.theme.colors.blue.blue300}`;
    }
  }};
`;

const ApplierName = styled.div`
  display: flex;
  width: 20rem;

  ${(props) => props.theme.fontStyles.body.bodyMedium};
  font-size: 1.4rem;
  font-weight: 500;

  color: ${(props) => props.theme.colors.gray.gray1100};
`;

const ProjectEmptyComment = styled.div`
  color: ${(props) => props.theme.colors.purple.purple600};
  ${(props) => props.theme.fontStyles.body.bodySemibold};
  font-size: 1.7rem;
  font-weight: 600;

  width: 20rem;
  display: flex;
  justify-content: flex-start;
`;

const TagList = styled.div`
  width: 25rem;
  gap: 1.25rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const MemoBox = styled.div`
  display: flex;
  overflow: hidden; /* 넘치는 부분 감추기 */

  display: flex;
  width: 7.5rem;
  justify-content: center;
  align-items: center;
`;
const MessageAlert = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  flex-shrink: 0;
  background-color: ${(props) =>
    props.theme.colors.gray.gray300}; /* 랜덤 컬러 전환 */
  border-radius: 50%;
  margin-left: -20%; /* 겹치는 부분 설정 */
  margin-bottom: 20%; /* 겹치는 부분 설정 */

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.theme.fontStyles.caption.captionRegular};
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray.gray1100};
`;

const InterviewState = styled.div<{ statusText?: string }>`
  ${(props) => props.theme.fontStyles.body.bodyRegular};
  font-size: 1.4rem;
  font-weight: 400;
  color: ${(props) => {
    switch (props.statusText) {
      case '면접 진행단계':
        return `${props.theme.colors.gray.gray600}`;
      default:
        return `${props.theme.colors.purple.purple600}`;
    }
  }};

  display: flex;
  width: 10rem;
  justify-content: center;
`;
const InterviewDate = styled.div`
  ${(props) => props.theme.fontStyles.body.bodyRegular};
  font-size: 1.4rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray.gray1100};

  display: flex;
  width: 10rem;
  justify-content: center;
`;
const FavoriteState = styled.div``;
