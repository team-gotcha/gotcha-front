import { useState } from 'react';
import styled, { css } from 'styled-components';

/**
 * 사용예시
 * <CommonInput placeholder="대주제명" size="small" type="err" />
 */

type InputType = 'on' | 'off' | 'err';
type InputSize = 'large' | 'small';

interface CommonInputProps {
  placeholder?: string;
  size?: InputSize;
  type?: InputType;
  width?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  ref?: React.Ref<HTMLInputElement>;
  value?: string;
  onChange?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
const CommonInput = ({ ...props }: CommonInputProps) => {
  return <StyledInput {...props} />;
};

export default CommonInput;

const StyledInput = styled.input<CommonInputProps>`
  width: ${(props) => (props.width ? props.width : '43.75rem')};
  padding: 0.5rem 1rem;
  align-items: center;
  border-radius: 0.75rem;

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.purple.purple600};
  }
  /* size가 large인 경우 */
  ${(props) =>
    props.size === 'large' &&
    css`
      height: 3.5rem;
      font-size: 1rem;
      ${(props) => props.theme.fontStyles.subtitle.subtitleRegular};
    `}

  /* size가 small인 경우 */
  ${(props) =>
    props.size === 'small' &&
    css`
      height: 3rem;
      font-size: 0.875rem;
      ${(props) => props.theme.fontStyles.body.bodyRegular};
    `}

  /* type에 따른 스타일 변경 */
  ${(props) =>
    props.type === 'off' &&
    css`
      border: 1px solid ${(props) => props.theme.colors.gray.gray600};
      &::placeholder {
        color: ${(props) => props.theme.colors.gray.gray600};
      }
    `}
  ${(props) =>
    props.type === 'on' &&
    css`
      border: 1px solid ${(props) => props.theme.colors.purple.purple600};
      &::placeholder {
        color: ${(props) => props.theme.colors.purple.purple600};
      }
    `}
  ${(props) =>
    props.type === 'err' &&
    css`
      border: 1px solid ${(props) => props.theme.colors.red.red200};
      &::placeholder {
        color: ${(props) => props.theme.colors.red.red200};
      }
    `}

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.purple.purple600};
  }

  background: ${(props) => props.theme.colors.gray.gray100};
`;
