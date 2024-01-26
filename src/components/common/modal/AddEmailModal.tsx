import styled, { css } from 'styled-components';
import CloseIcon from '../../../assets/icons/CloseIcon';
import CommonInput from '../CommomInput';
import CommonButton from '../CommonButton';
import { useEffect, useRef, useState } from 'react';
import CommonTag from '../CommonTag';
import CloseIconSmall from '../../../assets/icons/CloseIconSmall';
import { usePostAddProject } from '../../../apis/post/usePostAddProject';
import { useToggleModal } from '../../../hooks/useToggleModal';
import { usePatchUserEmail } from '../../../apis/patch/usePatchUserEmail';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../recoil/modal';

interface AddProjectModalProps {
  children?: string;
}

const AddEmailModal = ({ ...props }: AddProjectModalProps) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const memberInputRef = useRef<HTMLInputElement>(null);
  const [memberEmail, setMemberEmail] = useState('');
  const { openModal } = useToggleModal();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useRecoilState<boolean>(modalState);

  //custom-hook
  const fetchData = usePatchUserEmail();

  /**
   * project 데이터 전송해 생성하는 기능
   */
  const handleSubmit = () => {
    fetchData.setUserEmail({
      email: memberEmail,
    });
    setIsModalOpen(false);
    console.log('가자');
    navigate(`/main/callback?isEmailSet=${true}`);
  };

  return (
    <Wrapper>
      <ModalTop>
        <Title>이메일 입력</Title>
        <CloseIcon width="1.5rem" />
      </ModalTop>
      <ModalBody>
        <CommonInput
          placeholder="gotcha@gmail.com"
          size="small"
          type="off"
          width="100%"
          ref={memberInputRef}
          value={memberEmail}
          onChange={(e) => {
            setMemberEmail(e.currentTarget.value);
          }}
        />
        <ModalFooter>
          <CommonButton
            size="small"
            color="lineGray"
            children="저장"
            padding="0.125rem 1.875rem"
            onClick={handleSubmit}
          />
        </ModalFooter>
      </ModalBody>
    </Wrapper>
  );
};

export default AddEmailModal;

const RowBox = styled.div`
  display: inline-flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
`;
const CloseWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0rem;
`;
const EmailTag = styled.div`
  display: flex;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.2rem;
  ${(props) => props.theme.fontStyles.body.bodyRegular};
  border: 1px solid ${(props) => props.theme.colors.purple.purple400};
  color: ${(props) => props.theme.colors.gray.gray110};
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 47.625rem;
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
const ModalBody = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;

  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%;
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

  width: 100%;
`;
const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
