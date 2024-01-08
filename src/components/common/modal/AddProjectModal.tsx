import styled, { css } from 'styled-components';
import CloseIcon from '../../../assets/icons/CloseIcon';
import CommonInput from '../CommomInput';

/**
 * 사용예시
 * <CommonButton color={'lineGray'} size={'large'} children="텍스트" />
 */

interface AddProjectModalProps {
  children?: string;
}

const AddProjectModal = ({ ...props }: AddProjectModalProps) => {
  return (
    <Wrapper>
      <ModalTop>
        <Title>새 프로젝트 추가</Title>
        <CloseIcon width="1.5rem" />
      </ModalTop>
      <ModalBody>
        <CommonInput placeholder="대주제명" size="small" type="err" />
      </ModalBody>
    </Wrapper>
  );
};

export default AddProjectModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 47.625rem;
  height: 24rem;
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
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 2.5rem;
  padding-left: 18.75rem;
  padding-bottom: 0.88rem;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray.gray300};
`;
const ModalBody = styled.div``;
