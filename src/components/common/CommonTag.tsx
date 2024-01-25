import styled, { css } from 'styled-components';
import { theme } from '../../style/theme';

/**
 * 사용예시
 * <CommonButton color={'lineGray'} size={'large'} children="텍스트" />
 */

interface CommonTagProps {
  children: string;
  width?: string;
  fontSize?: string;
}

const CommonTag = ({ ...props }: CommonTagProps) => {
  return <StyledTag {...props}>{props.children}</StyledTag>;
};

export default CommonTag;

const StyledTag = styled.div<CommonTagProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  height: 2rem;
  border-radius: 1.25rem;
  padding: 0.2rem 1.2rem;

  background-color: ${(props) => props.theme.colors.blue.blue100};
  color: ${(props) => props.theme.colors.purple.purple500};
  ${(props) => props.theme.fontStyles.caption.captionRegular};
  font-size: 1.2rem;
  font-weight: 400;

  ${(props) =>
    props.width &&
    css`
      width: ${props.width};
    `};

  ${(props) =>
    props.fontSize &&
    css`
      font-size: ${props.fontSize};
    `};
`;
