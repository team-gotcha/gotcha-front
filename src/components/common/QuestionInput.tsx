import styled, { css } from 'styled-components';

/**
 * 사용예시
 * <CommonInput placeholder="대주제명" size="small" type="err" />
 */

type InputType = 'on' | 'off' | 'err';
type InputSize = 'large' | 'small';

interface QuestionInputProps {
  placeholder?: string;
  size?: InputSize;
  type?: InputType;
  width?: string;
  questionNum?: string;
}

const QuestionInput = ({ ...props }: QuestionInputProps) => {
  return (
    <Wrapper>
      <QuestionHeader {...props}>Q{props.questionNum}</QuestionHeader>
      <StyledInput
        {...props}
        placeholder="면접에 사용할 공통질문을 입력해주세요"
      />
    </Wrapper>
  );
};

export default QuestionInput;

const Wrapper = styled.div`
  display: flex;
  width: 45rem;
  height: 3rem;

  align-items: center;
  gap: 0.75rem;

  border-radius: 0.75rem;
  border: 1px solid ${(props) => props.theme.colors.gray.gray300};
  background: var(--Gray-100, #fff);
`;

const QuestionHeader = styled.div<QuestionInputProps>`
  display: flex;
  width: 8rem;
  height: 100%;
  padding: 0.5rem 1rem;
  align-items: center;
  justify-content: center;

  color: ${(props) => props.theme.colors.gray.gray600};
  ${(props) => props.theme.fontStyles.body.bodyRegular};
  font-size: 0.875rem;
  font-weight: 400;

  border-right: 1px solid ${(props) => props.theme.colors.gray.gray300};
`;

const StyledInput = styled.input<QuestionInputProps>`
  align-items: center;
  border: none;

  /* size가 large인 경우 */
  ${(props) =>
    props.size === 'large' &&
    css`
      height: 3rem;
      font-size: 1rem;
      ${(props) => props.theme.fontStyles.subtitle.subtitleRegular};
    `}

  /* size가 small인 경우 */
  ${(props) =>
    props.size === 'small' &&
    css`
      width: 100%;
      ${(props) => props.theme.fontStyles.body.bodyRegular};
      font-size: 0.875rem;
      font-weight: 400;
    `}

  /* type에 따른 스타일 변경 */
  ${(props) =>
    props.type === 'off' &&
    css`
      &::placeholder {
        color: ${(props) => props.theme.colors.gray.gray500};
      }
    `}
  ${(props) =>
    props.type === 'on' &&
    css`
      &::placeholder {
        color: ${(props) => props.theme.colors.purple.purple600};
      }
    `}
  ${(props) =>
    props.type === 'err' &&
    css`
      &::placeholder {
        color: ${(props) => props.theme.colors.red.red200};
      }
    `}

  background: ${(props) => props.theme.colors.gray.gray100};
`;
