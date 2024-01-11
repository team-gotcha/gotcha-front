import React, { useState } from 'react';
import { styled } from 'styled-components';
import StarOffIcon from '../../assets/icons/StarOffIcon';
import CommonTag from '../common/CommonTag';
import MessageIcon from '../../assets/icons/MessageIcon';

interface ViewListStackProps {
  isFirst?: boolean; //첫요소 leftTop 라운드처리
  isLast?: boolean; //마지막요소 leftBottom 라운드처리
  tagList?: Array<string>; //키워드리스트 첫입력 3개 고정(성향,스킬,경험순)
  memoNum?: number; //새로 추가된 메모 개수 (1개 이상 시 색변경)

  groupMemberList?: Array<string>;
  interviewState?: string; //면접진행단계
  interviewDate?: string; //면접진행날짜

  isStar?: boolean; //즐찾표시 여부
  isEmpty?: boolean; //빈 스택 여부
}

const ViewListStack = ({ ...props }: ViewListStackProps) => {
  return (
    <>
      {!props.isEmpty && (
        <Wrapper>
          <ApplierName>가차린</ApplierName>
          <TagList>
            <CommonTag children="태그" />
            <CommonTag children="태그" />
            <CommonTag children="태그" />
          </TagList>
          <MemoBox>
            <MessageIcon width={'1.625rem'} height={'1.625rem'} />
            <MessageAlert>0</MessageAlert>
          </MemoBox>
          <GroupMemberList>
            <GroupMemberImg>K</GroupMemberImg>
            <GroupMemberImg>P</GroupMemberImg>
            <GroupMemberImg>A</GroupMemberImg>
            <GroupMemberImg>A</GroupMemberImg>
            <GroupMemberImg>C</GroupMemberImg>
          </GroupMemberList>
          <InterviewState>면접 진행 단계</InterviewState>
          <InterviewDate>2023.12.11 월</InterviewDate>
          <FavoriteState>
            <StarOffIcon />
          </FavoriteState>
        </Wrapper>
      )}

      {props.isEmpty && (
        <WrapperEmpty>
          <ProjectEmptyComment>+ 첫 면접을 만들어주세요!</ProjectEmptyComment>
          <TagList>
            <CommonTag children="" width="4.7rem" />
            <CommonTag children="" width="4.7rem" />
            <CommonTag children="" width="4.7rem" />
          </TagList>
        </WrapperEmpty>
      )}
    </>
  );
};

export default ViewListStack;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  width: 100%;
  height: 5.6rem;

  background-color: ${(props) => props.theme.colors.gray.gray100};
  border-bottom: 0.1rem solid ${(props) => props.theme.colors.purple.purple200};
  border-left: 0.5rem solid ${(props) => props.theme.colors.purple.purple600};
`;

const WrapperEmpty = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100%;
  height: 5.6rem;

  background-color: ${(props) => props.theme.colors.gray.gray100};
  border-bottom: 0.1rem solid ${(props) => props.theme.colors.purple.purple200};
  border-left: 0.5rem solid ${(props) => props.theme.colors.purple.purple200};
`;

const ApplierName = styled.div`
  display: flex;
  width: 16.25rem;

  ${(props) => props.theme.fontStyles.body.bodyMedium};
  font-size: 0.875rem;
  font-weight: 500;

  color: ${(props) => props.theme.colors.gray.gray1100};
`;

const ProjectEmptyComment = styled.div`
  color: ${(props) => props.theme.colors.purple.purple700};
  ${(props) => props.theme.fontStyles.title.titleRegular};
  font-size: 2rem;
  font-weight: 400;

  width: 30rem;
  padding-left: 1.6rem;
  display: flex;
  justify-content: flex-start;
`;

const TagList = styled.div`
  width: 18.75rem;
  gap: 1.25rem;

  display: flex;
  justify-content: center;
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
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  background-color: ${(props) =>
    props.theme.colors.gray.gray300}; /* 랜덤 컬러 전환 */
  border-radius: 50%;
  margin-left: -10%; /* 겹치는 부분 설정 */
  margin-bottom: 10%; /* 겹치는 부분 설정 */

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.theme.fontStyles.caption.captionRegular};
  font-size: 0.75rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray.gray1100};
`;
const GroupMemberList = styled.div`
  display: flex;
  overflow: hidden; /* 넘치는 부분 감추기 */
`;
const GroupMemberImg = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  flex-shrink: 0;
  background-color: ${(props) =>
    props.theme.colors.gray.gray300}; /* 랜덤 컬러 전환 */
  border: 0.1rem solid #fff;
  border-radius: 50%;
  margin-right: -5%; /* 겹치는 부분 설정 */

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.theme.fontStyles.caption.captionRegular};
  font-size: 0.75rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray.gray900};
`;
const InterviewState = styled.div`
  ${(props) => props.theme.fontStyles.body.bodyRegular};
  font-size: 0.875rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.blue.blue600};

  display: flex;
  width: 10rem;
  justify-content: center;
`;
const InterviewDate = styled.div`
  ${(props) => props.theme.fontStyles.body.bodyRegular};
  font-size: 0.875rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray.gray1100};

  display: flex;
  width: 10rem;
  justify-content: center;
`;
const FavoriteState = styled.div``;
