import React, { useState } from 'react';
import { styled } from 'styled-components';
import StarOffIcon from '../../assets/icons/StarOffIcon';
import CommonTag from '../common/CommonTag';
import MessageIcon from '../../assets/icons/MessageIcon';
import ThinMessageIcon from '../../assets/icons/ThinMessageIcon';
import MailIcon from '../../assets/icons/MailIcon';

interface ViewFinalSuccessfulApplierProps {
  isComplete?: boolean; //합격자 선정 완료 여부
}

const ViewFinalSuccessfulApplier = ({
  isComplete = true,
}: ViewFinalSuccessfulApplierProps) => {
  return (
    <Wrapper isComplete={isComplete}>
      <ViewStack>
        <Title isComplete={isComplete}>최종 합격자</Title>
        <GroupMemberList>
          <GroupMemberImg />
          <GroupMemberImg />
          <GroupMemberImg />
        </GroupMemberList>
      </ViewStack>
      <MailButton isComplete={isComplete}>
        {isComplete ? (
          <MailIcon width="1.45831rem" />
        ) : (
          <MailIcon width="1.45831rem" color="#B3B3B3" />
        )}
      </MailButton>
    </Wrapper>
  );
};

export default ViewFinalSuccessfulApplier;

const Wrapper = styled.div<{ isComplete?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;
const ViewStack = styled.div<{ isComplete?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 1.7rem;
  padding-right: 1.7rem;

  width: 25.75rem;
  height: 3rem;

  border-radius: 0.5rem;
  background: var(--Gray-100, #fff);

  /* 회색 */
  box-shadow: 0px 0px 6px 2px rgba(215, 215, 215, 0.15);

  /* isComplete가 false일 때 border 색 변경*/
  border: 1px solid
    ${(props) =>
      props.isComplete
        ? props.theme.colors.purple.purple600
        : props.theme.colors.gray.gray300};
`;
const Title = styled.div<{ isComplete?: boolean }>`
  width: 4.875rem;
  ${(props) => props.theme.fontStyles.subtitle.subtitleRegular};
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;

  background: linear-gradient(
    97deg,
    rgba(47, 255, 230, 0.82) -6.72%,
    rgba(46, 180, 255, 0.68) 20.82%,
    #625fff 45.11%,
    rgba(163, 46, 255, 0.98) 104.5%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* isComplete가 false일 때 색 변경*/
  color: ${(props) =>
    props.isComplete ? 'inherit' : props.theme.colors.gray.gray500};
`;
const MailButton = styled.div<{ isComplete?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.3125rem;
  height: 3.3125rem;
  border-radius: 2.5rem;
  border: 1px solid ${(props) => props.theme.colors.purple.purple600};
  background: ${(props) => props.theme.colors.gray.gray100};

  /* isComplete가 false일 때 border 색 변경*/
  border: 1px solid
    ${(props) =>
      props.isComplete
        ? props.theme.colors.purple.purple600
        : props.theme.colors.gray.gray300};
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
  border-radius: 50%;
  margin-right: -10%; /* 겹치는 부분 설정 */

  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.theme.fontStyles.caption.captionRegular};
  font-size: 0.75rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray.gray900};
`;
