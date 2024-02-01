import styled, { css } from 'styled-components';
import { theme } from '../../style/theme';

/**
 * 사용예시
 * <CommonButton color={'lineGray'} size={'large'} children="텍스트" />
 */

type ButtonColor = 'lineGray' | 'lineBlue' | 'fillBlue' | 'fillDark';
type ButtonSize = 'large' | 'small';

interface ButtonType {
  color: ButtonColor;
  size: ButtonSize;
  children: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  padding?: string;
  disabled?: boolean;
}

const CommonButton = ({ ...props }: ButtonType) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

const StyledButton = styled.button<ButtonType>`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid;

  ${({ color }) => getButtonColor(color)};
  ${({ size }) => getButtonShape(size)};

  /* Additional styles based on props */
  ${({ width }) => width && `width: ${width};`}
  ${({ height }) => height && `height: ${height};`}
  ${({ padding }) => padding && `padding: ${padding};`}
  
  /* Disabled styles */
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}

  &:hover {
    ${({ color, disabled }) => !disabled && getButtonColor('fillBlue')};
  }
  z-index: 1;
`;

export default CommonButton;

const getButtonColor = (buttonColor: ButtonColor) => {
  let backgroundColor;
  let fontColor;
  let borderColor;

  switch (buttonColor) {
    case 'lineGray':
      backgroundColor = theme.colors.gray.gray100;
      fontColor = theme.colors.gray.gray500;
      borderColor = theme.colors.gray.gray500;
      break;
    case 'lineBlue':
      backgroundColor = theme.colors.gray.gray100;
      fontColor = theme.colors.purple.purple600;
      borderColor = theme.colors.purple.purple600;
      break;
    case 'fillBlue':
      backgroundColor = theme.colors.purple.purple600;
      fontColor = theme.colors.gray.gray100;
      borderColor = theme.colors.purple.purple600;
      break;
    case 'fillDark':
      backgroundColor = theme.colors.gray.gray300;
      fontColor = theme.colors.gray.gray700;
      break;

    default:
      return null;
  }

  return css`
    background: ${backgroundColor};
    color: ${fontColor};
    border-color: ${borderColor};
  `;
};

const getButtonShape = (buttonSize: ButtonSize) => {
  let borderRadius;
  let fontStyle;
  let height;
  let fontSize;
  let fontWeight;

  switch (buttonSize) {
    case 'large':
      height = '5.2rem';
      borderRadius = '2.2rem';
      fontStyle = theme.fontStyles.button.buttonLarge;
      break;

    case 'small':
      height = '3rem';
      borderRadius = '1.25rem';
      fontStyle = theme.fontStyles.subtitle.subtitleMedium;
      fontSize = '1rem';
      fontWeight = '500';
      break;
    default:
      return null;
  }

  return css`
    height: ${height};
    border-radius: ${borderRadius};
    ${fontStyle};
    font-size: ${fontSize};
    font-size: ${fontWeight};
  `;
};
