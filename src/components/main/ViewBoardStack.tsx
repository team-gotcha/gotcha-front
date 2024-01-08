import React, { useState } from 'react';
import { styled } from 'styled-components';
import StarOffIcon from '../../assets/icons/StarOffIcon';
import CommonTag from '../common/CommonTag';
import MessageIcon from '../../assets/icons/MessageIcon';
import ThinMessageIcon from '../../assets/icons/ThinMessageIcon';

interface ViewBoardStackProps {
  tagList?: Array<string>; //키워드리스트 첫입력 3개 고정(성향,스킬,경험순)
  memoNum?: number; //새로 추가된 메모 개수 (1개 이상 시 색변경)

  groupMemberList?: Array<string>;
  interviewState?: string; //면접진행단계
  interviewDate?: string; //면접진행날짜

  isStar?: boolean; //즐찾표시 여부
}

const ViewBoardStack = ({ ...props }: ViewBoardStackProps) => {
  return (
    <Wrapper>
      <BoardTop>
        <ApplierName>가차린</ApplierName>
        <InterviewDate>12/15</InterviewDate>
        <FavoriteState>
          <StarOffIcon />
        </FavoriteState>
      </BoardTop>

      <BoardBottom>
        <ThinMessageIcon width="1.37rem" height="1.32rem" />
        <TagList>
          <CommonTag children="태그" />
          <CommonTag children="태그" />
          <CommonTag children="태그" />
        </TagList>
        <GroupMemberList>
          <GroupMemberImg>K</GroupMemberImg>
          <GroupMemberImg>P</GroupMemberImg>
          <GroupMemberImg>A</GroupMemberImg>
          <GroupMemberImg>A</GroupMemberImg>
        </GroupMemberList>
      </BoardBottom>
    </Wrapper>
  );
};

export default ViewBoardStack;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 30rem;
  height: 6.3125rem;
  flex-shrink: 0;

  border-radius: 0.75rem 0.75rem 0rem 0rem;
  border: 1px solid ${(props) => props.theme.colors.purple.purple200};
  background-color: ${(props) => props.theme.colors.gray.gray100};
`;

const BoardTop = styled.div`
  width: 100%;
  height: 2.94rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.purple.purple200};

  padding-right: 2.77rem;
  padding-left: 2.44rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BoardBottom = styled.div`
  width: 100%;
  height: 3.38rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-left: 3.38rem;
  padding-right: 2.44rem;
`;

const ApplierName = styled.div`
  display: flex;
  width: 19rem;

  ${(props) => props.theme.fontStyles.body.bodySemibold};
  font-size: 1.125rem;
  font-weight: 600;

  color: ${(props) => props.theme.colors.gray.gray1100};
`;

const InterviewDate = styled.div`
  ${(props) => props.theme.fontStyles.subtitle.subtitleRegular};
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray.gray900};

  display: flex;
  justify-content: center;
`;

const TagList = styled.div`
  gap: 0.25rem;

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
const FavoriteState = styled.div``;