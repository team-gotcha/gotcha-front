import styled, { css } from 'styled-components';
import { theme } from '../../style/theme';

/**
 * 사용예시
 * <CommonButton color={'lineGray'} size={'large'} children="텍스트" />
 */

interface CommonTagProps {
  children: string;
}

const CommonTag = ({ ...props }: CommonTagProps) => {
  return <StyledTag>{props.children}</StyledTag>;
};

export default CommonTag;

const StyledTag = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  height: 1.25rem;
  border-radius: 1.25rem;
  padding: 0.125rem 0.75rem;

  background-color: ${(props) => props.theme.colors.blue.blue100};
  color: ${(props) => props.theme.colors.purple.purple500};
  ${(props) => props.theme.fontStyles.caption.captionRegular};
  font-size: 0.75rem;
`;