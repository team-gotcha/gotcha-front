import styled, { css } from 'styled-components';
import CloseIcon from '../../../assets/icons/CloseIcon';
import CommonInput from '../CommomInput';
import CommonButton from '../CommonButton';
import DropDown from '../DropDown';
import { useState } from 'react';
import DropDownBox from '../DropDownBox';

/**
 * 사용예시
 * <CommonButton color={'lineGray'} size={'large'} children="텍스트" />
 */

interface AddInterviewModalProps {
  children?: string;
}

const AddInterviewModal = ({ ...props }: AddInterviewModalProps) => {
  const [selectedField, setSelectedField] = useState('분야');
  const [selectedJob, setSelectedJob] = useState('직무');
  const handleSelectField = (option: string) => {
    setSelectedField(option);
  };
  const handleSelectJob = (option: string) => {
    setSelectedJob(option);
  };
  return (
    <Wrapper>
      <ModalTop>
        <Title>세부면접 추가</Title>
        <CloseIcon width="1.5rem" />
      </ModalTop>
      <ModalBody>
        <CommonInput placeholder="면접 이름" size="small" type="off" />
        <div>
          <SubTitle>초대하기</SubTitle>
          <InviteWrapper>
            <CommonInput
              placeholder="gotcha@gmail.com"
              size="small"
              type="off"
              width="38.125rem"
            />
            <CommonButton
              color={'lineGray'}
              size={'small'}
              children="초대"
              width="5.125rem"
              height="3rem"
              padding="0.625rem 0.75rem"
            />
          </InviteWrapper>
        </div>

        <ModalFooter>
          <SelectWrapper>
            <SubTitle>면접 유형</SubTitle>
            <DropDownWrapper>
              <DropDownBox />
              <DropDownBox />
            </DropDownWrapper>
          </SelectWrapper>

          <CommonButton
            size="small"
            color="lineGray"
            children="면접 진행하기"
            padding="0.125rem 1.875rem"
          />
        </ModalFooter>
      </ModalBody>
    </Wrapper>
  );
};

export default AddInterviewModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 47.625rem;
  height: 29.75rem;
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

const SubTitle = styled.div`
  color: ${(props) => props.theme.colors.gray.gray1100};
  ${(props) => props.theme.fontStyles.subtitle.subtitleRegular};
  font-size: 1rem;
  font-weight: 400;
`;
const InviteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`;
