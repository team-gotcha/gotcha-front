import React, { useState } from 'react';
import { styled } from 'styled-components';
import StarOffIcon from '../../assets/icons/StarOffIcon';
import CommonTag from '../common/CommonTag';
import MessageIcon from '../../assets/icons/MessageIcon';

interface ViewListStackProps {
  tagList?: Array<string>; //키워드리스트 첫입력 3개 고정(성향,스킬,경험순)
  memoNum?: number; //새로 추가된 메모 개수 (1개 이상 시 색변경)

  groupMemberList?: Array<string>;
  interviewState?: string; //면접진행단계
  interviewDate?: string; //면접진행날짜

  isStar?: boolean; //즐찾표시 여부
  isEmpty?: boolean; //빈 스택 여부
}

interface GroupMemberImgProps {
  index: number;
}

const ViewListStack = ({
  groupMemberList = [],
  ...props
}: ViewListStackProps) => {
  const InterviewStateList = ['면접 준비중', '면접 진행중', '면접 전형 완료'];
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
            <MessageIcon width={'2.6rem'} height={'2.8rem'} />
            <MessageAlert>0</MessageAlert>
          </MemoBox>
          <GroupMemberList>
            {groupMemberList?.map((member, index) => (
              <GroupMemberImg
                key={index}
                index={groupMemberList.length - index}
              >
                {member.charAt(0)}
              </GroupMemberImg>
            ))}
          </GroupMemberList>
          <InterviewState>{InterviewStateList[1]}</InterviewState>
          <InterviewDate>2023.12.11 월</InterviewDate>
          <FavoriteState>
            <StarOffIcon />
          </FavoriteState>
        </Wrapper>
      )}

      {props.isEmpty && (
        <Wrapper>
          <ProjectEmptyComment>새로운 지원자를 추가하세요!</ProjectEmptyComment>
          <TagList>
            <CommonTag children="태그" />
            <CommonTag children="태그" />
            <CommonTag children="태그" />
          </TagList>
          <MemoBox>
            <MessageIcon width={'2.6rem'} height={'2.8rem'} />
            <MessageAlert>0</MessageAlert>
          </MemoBox>
          <GroupMemberList>
            {groupMemberList?.map((member, index) => (
              <GroupMemberImg
                key={index}
                index={groupMemberList.length - index}
              >
                {member.charAt(0)}
              </GroupMemberImg>
            ))}
          </GroupMemberList>
          <InterviewState>{InterviewStateList[1]}</InterviewState>
          <InterviewDate>2023.12.11 월</InterviewDate>
          <FavoriteState>
            <StarOffIcon />
          </FavoriteState>
        </Wrapper>
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
  font-size: 1%.4;
  font-weight: 500;

  color: ${(props) => props.theme.colors.gray.gray1100};
`;

const ProjectEmptyComment = styled.div`
  color: ${(props) => props.theme.colors.purple.purple600};
  ${(props) => props.theme.fontStyles.body.bodySemibold};
  font-size: 1.8rem;
  font-weight: 600;

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
const GroupMemberList = styled.div`
  display: flex;
  overflow: hidden; /* 넘치는 부분 감추기 */
`;
const GroupMemberImg = styled.div<GroupMemberImgProps>`
  width: 2.8rem;
  height: 2.8rem;
  flex-shrink: 0;
  background-color: ${(props) => props.theme.colors.gray.gray300};
  border: 0.1rem solid #fff;
  border-radius: 50%;
  margin-right: -5%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => props.theme.fontStyles.caption.captionRegular};
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray.gray900};

  z-index: ${(props) => props.index};
`;

const InterviewState = styled.div`
  ${(props) => props.theme.fontStyles.body.bodyRegular};
  font-size: 1.4rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.blue.blue600};

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
