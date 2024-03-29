import React, { useState } from 'react';
import { styled } from 'styled-components';
import StarOffIcon from '../../assets/icons/StarOffIcon';
import CommonTag from '../common/CommonTag';
import MessageIcon from '../../assets/icons/MessageIcon';
import ThinMessageIcon from '../../assets/icons/ThinMessageIcon';
import MailIcon from '../../assets/icons/MailIcon';
import CommonGroupMembers from '../common/CommonGroupMembers';
import { usePostSendPassEmail } from '../../apis/post/usePostSendPassEmail';
import { useLocation, useNavigate } from 'react-router';

interface ViewFinalSuccessfulApplierProps {
  isComplete?: boolean; //합격자 선정 완료 여부
  groupMembers?: Array<string>;
  handleSendPassEmail?: () => void;
  disabled?: boolean;
}

const ViewFinalSuccessfulApplier = ({
  isComplete = false,
  ...props
}: ViewFinalSuccessfulApplierProps) => {
  const location = useLocation();
  const { pathname } = location;
  let interview_id = '';
  let project_id = '';
  // pathname에서 interview_id 또는 project_id 추출
  const pathSegments = pathname.split('/');
  if (pathSegments.includes('interview')) {
    const index = pathSegments.indexOf('interview');
    interview_id = pathSegments[index + 1];
  } else if (pathSegments.includes('project')) {
    const index = pathSegments.indexOf('project');
    project_id = pathSegments[index + 1];
  }

  const navigate = useNavigate();
  const handleMoveToResult = () => {
    if (props.disabled) {
      alert('결과를 확인할 면접자가 없어요!');
    } else {
      navigate(`/result/${interview_id}`);
    }
  };
  return (
    <Wrapper>
      <ViewStack isComplete={isComplete}>
        {isComplete && (
          <NotiOnTitle onClick={props.handleSendPassEmail}>
            최종 합격자
          </NotiOnTitle>
        )}
        {!isComplete && (
          <NotiOffTitle onClick={handleMoveToResult}>
            합격자 발표를 완료해주세요
          </NotiOffTitle>
        )}
        <CommonGroupMembers showNum={4} groupMemberList={props.groupMembers} />
      </ViewStack>
      <MailButton
        isComplete={isComplete}
        onClick={
          isComplete
            ? props.handleSendPassEmail
            : () => {
                alert('합격자 발표를 완료해주세요!');
              }
        }
      >
        {isComplete ? (
          <MailIcon width="2.8rem" color="#3733FF" />
        ) : (
          <MailIcon width="2.8rem" color="#B3B3B3" />
        )}
      </MailButton>
    </Wrapper>
  );
};

export default ViewFinalSuccessfulApplier;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const ViewStack = styled.div<{ isComplete?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 1.7rem;
  padding-right: 1.7rem;

  width: 41.2rem;
  height: 4.8rem;

  /* isComplete가 false일 때 border 색 변경*/
  border: 1px solid
    ${(props) =>
      props.isComplete
        ? props.theme.colors.purple.purple600
        : props.theme.colors.gray.gray300};

  border-radius: 0.5rem;
  background: white;

  /* 회색 */
  box-shadow: 0px 0px 6px 2px rgba(215, 215, 215, 0.15);
`;
const NotiOnTitle = styled.div`
  ${(props) => props.theme.fontStyles.subtitle.subtitleRegular};
  font-size: 1.6rem;
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
`;

const NotiOffTitle = styled.button`
  ${(props) => props.theme.fontStyles.subtitle.subtitleRegular};
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  color: ${(props) => props.theme.colors.gray.gray500};
`;
const MailButton = styled.button<{ isComplete?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 5.3rem;
  height: 5.3rem;
  border-radius: 2.5rem;
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
  width: 2.7rem;
  height: 2.7rem;
  flex-shrink: 0;
  background-color: ${(props) =>
    props.theme.colors.gray.gray300}; /* 랜덤 컬러 전환 */
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
