import styled, { css } from 'styled-components';

interface CommonGroupMembersProps {
  groupMemberList?: Array<string>;
  showNum?: number;
}

interface GroupMemberImgProps {
  index: number;
}

const CommonGroupMembers = ({
  groupMemberList = [],
  showNum = 0,
}: CommonGroupMembersProps) => {
  const generateArray = () => {
    const filledArray = groupMemberList.slice(0, showNum);
    const remainingEmptySlots = Math.max(0, showNum - groupMemberList.length);
    const emptyArray = Array(remainingEmptySlots).fill('');
    return [...filledArray, ...emptyArray];
  };

  return (
    <GroupMemberList>
      {generateArray().map((member, index) => (
        <GroupMemberImg
          key={index}
          index={generateArray().length - index}
          isEmpty={member === ''}
        >
          {member ? member.charAt(0) : ''}
        </GroupMemberImg>
      ))}
    </GroupMemberList>
  );
};

export default CommonGroupMembers;

const GroupMemberList = styled.div`
  display: flex;
  overflow: hidden; /* 넘치는 부분 감추기 */
`;

const emptyStyles = css`
  background-color: ${(props) => props.theme.colors.gray.gray100};
  border: 1px solid ${(props) => props.theme.colors.purple.purple500};
  border-style: dashed;
`;

const GroupMemberImg = styled.div<GroupMemberImgProps & { isEmpty: boolean }>`
  width: 2.8rem;
  height: 2.8rem;
  flex-shrink: 0;
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
  background-color: ${(props) => props.theme.colors.gray.gray200};
  ${(props) => props.isEmpty && emptyStyles}

  z-index: ${(props) => props.index};
`;
