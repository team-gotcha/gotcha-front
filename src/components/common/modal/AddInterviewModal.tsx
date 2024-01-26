import styled, { css } from 'styled-components';
import CloseIcon from '../../../assets/icons/CloseIcon';
import CommonInput from '../CommomInput';
import CommonButton from '../CommonButton';
import DropDown from '../DropDown';
import { useEffect, useRef, useState } from 'react';
import DropDownBox from '../DropDownBox';
import CloseIconSmall from '../../../assets/icons/CloseIconSmall';
import { usePostAddInterview } from '../../../apis/post/usePostAddInterview';
import { useToggleModal } from '../../../hooks/useToggleModal';
import areaOptions from '../../../assets/data/areaOptions.json';
import positionOptions from '../../../assets/data/positionOptions.json';
interface AddInterviewModalProps {
  children?: string;
  projectId?: number | undefined;
}

const AddInterviewModal = ({ ...props }: AddInterviewModalProps) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const memberInputRef = useRef<HTMLInputElement>(null);
  const [isDone, setIsDone] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberEmailList, setMemberEmailList] = useState([]);
  const { openModal } = useToggleModal();

  const [selectedArea, setSelectedArea] = useState('SERVICE');
  const [selectedPosition, setSelectedPosition] = useState('MARKETING');
  const handleSelectField = (option: string) => {
    setSelectedArea(option);
  };
  const handleSelectJob = (option: string) => {
    setSelectedPosition(option);
  };

  //custom-hook
  const fetchData = usePostAddInterview();

  /**
   * project 데이터 전송해 생성하는 기능
   */
  const handleSubmit = () => {
    fetchData.addInterview({
      name: projectTitle,
      emails: memberEmailList,
      projectId: props.projectId,
      area: selectedArea,
      position: selectedPosition,
    });
    openModal();
  };

  /**
   * enter시 다음 input창으로 focus되는 기능(수정필요)
   */
  const handleMoveInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      memberInputRef.current && memberInputRef.current.focus();
      setIsDone(true);
    }
  };
  useEffect(() => {
    titleInputRef.current && titleInputRef.current.focus();
  }, []);

  /**
   * 초대멤버 이메일을 저장하는 함수
   */
  const handleInvite = () => {
    console.log(memberEmail);
    if (memberEmail !== '') {
      memberEmailList.push(memberEmail);
    }
    setMemberEmail('');
  };

  /**
   * 이메일을 리스트에서 삭제
   * @param index
   */
  const removeMemberEmail = (index: number) => {
    const updatedList = [...memberEmailList];
    updatedList.splice(index, 1);
    setMemberEmailList(updatedList);
  };
  return (
    <Wrapper>
      <ModalTop>
        <Title>세부면접 추가</Title>
        <CloseIcon width="1.5rem" />
      </ModalTop>
      <ModalBody>
        <CommonInput
          placeholder="면접 이름"
          size="small"
          type="off"
          width="100%"
          ref={titleInputRef}
          onKeyDown={handleMoveInput}
          value={projectTitle}
          onChange={(e) => {
            setProjectTitle(e.currentTarget.value);
          }}
        />
        <div>
          <SubTitle>초대하기</SubTitle>
          <InviteWrapper>
            <CommonInput
              placeholder="gotcha@gmail.com"
              size="small"
              type="off"
              width="85%"
              ref={memberInputRef}
              value={memberEmail}
              onChange={(e) => {
                setMemberEmail(e.currentTarget.value);
              }}
            />

            <CommonButton
              color={'lineGray'}
              size={'small'}
              children="초대"
              width="5.125rem"
              height="3rem"
              padding="0.625rem 0.75rem"
              onClick={handleInvite}
            />
          </InviteWrapper>
        </div>
        {memberEmailList.length !== 0 && (
          <RowBox>
            {memberEmailList.map((email, index) => (
              <EmailTag key={index}>
                {email}
                <CloseWrapper onClick={() => removeMemberEmail(index)}>
                  <CloseIconSmall />
                </CloseWrapper>
              </EmailTag>
            ))}
          </RowBox>
        )}

        <ModalFooter>
          <SelectWrapper>
            <SubTitle>면접 유형</SubTitle>
            <DropDownWrapper>
              <DropDownBox options={areaOptions} />
              <DropDownBox options={positionOptions} />
            </DropDownWrapper>
          </SelectWrapper>

          <CommonButton
            size="small"
            color="lineGray"
            children="면접 진행하기"
            padding="0.125rem 1.875rem"
            onClick={handleSubmit}
          />
        </ModalFooter>
      </ModalBody>
    </Wrapper>
  );
};

export default AddInterviewModal;

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
