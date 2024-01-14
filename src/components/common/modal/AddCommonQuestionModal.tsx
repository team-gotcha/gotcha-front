import styled, { css } from 'styled-components';
import CloseIcon from '../../../assets/icons/CloseIcon';
import CommonInput from '../CommomInput';
import CommonButton from '../CommonButton';
import DropDown from '../DropDown';
import { useState } from 'react';
import DropDownBox from '../DropDownBox';
import QuestionInput from '../QuestionInput';

/**
 * 사용예시
 * <CommonButton color={'lineGray'} size={'large'} children="텍스트" />
 */

interface AddCommonQuestionModalProps {
  children?: string;
}

const AddCommonQuestionModal = ({ ...props }: AddCommonQuestionModalProps) => {
  return (
    <Wrapper>
      <ModalTop>
        <Title>면접 공통질문 추가</Title>
        <CloseIcon width="1.5rem" />
      </ModalTop>
      <ModalBody>
        <QuestionInputWrapper>
          <QuestionInput questionNum="1" size="small" type="off" />
          <QuestionInput questionNum="2" size="small" type="off" />
          <QuestionInput questionNum="3" size="small" type="off" />
          <QuestionInput questionNum="4" size="small" type="off" />
          <QuestionInput questionNum="5" size="small" type="off" />
        </QuestionInputWrapper>
        <ModalFooter>
          <CommonButton
            size="small"
            color="lineGray"
            children="공통 질문 추가하기"
            padding="0.125rem 1.875rem"
          />
        </ModalFooter>
      </ModalBody>
    </Wrapper>
  );
};

export default AddCommonQuestionModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 47.625rem;
  height: 32.625rem;
  justify-content: flex-start;
  align-items: center;
  border-radius: 1.25rem;

  padding-top: 1.88rem;
  padding-bottom: 1.88rem;

  background-color: ${(props) => props.theme.colors.gray.gray100};
`;
const Title = styled.div`
  ${(props) => props.theme.fontStyles.headline.headlineBold};
  color: ${(props) => props.theme.colors.purple.purple600};
  font-size: 1.5rem;
  font-weight: 600;
`;
const ModalTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 2.5rem;
  padding-left: 18.75rem;
  padding-bottom: 0.88rem;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray.gray300};
`;
const ModalBody = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;

  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
`;
const QuestionInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
