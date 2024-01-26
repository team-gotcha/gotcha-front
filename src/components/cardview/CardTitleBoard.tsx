import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import CloseIcon from "../../assets/icons/CloseIcon";

const CardTitleBoard = ({
  state = "면접 진행 중",
  title = "UXUI 디자이너 면접",
  btnText = "면접 준비 완료",
  subFunc = () => {},
  btnFunc = () => {},
  info = false,
  color = 1,
  del = false,
}) => {
  let font_color;
  let background_color;
  const navigate = useNavigate();

  switch (color) {
    case 1:
      font_color = "#3733FF";
      background_color = "#CCDAFF";
      break;
    case 2:
      font_color = "#FFF";
      background_color = "#6690FF";
      break;
    case 3:
      font_color = "#3733FF";
      background_color = "#E5ECFF";
      break;

    default:
      font_color = "#3733FF";
      background_color = "#CCDAFF";
  }

  return (
    <TopDiv color={background_color}>
      <InfoDiv color={font_color}>
        <InterviewState>{state}</InterviewState>
        <Title>{title}</Title>
      </InfoDiv>
      <RightDiv>
        {color === 1 && <FinBtn onClick={subFunc}>임시 POST</FinBtn>}
        <FinBtn onClick={btnFunc}>{btnText}</FinBtn>
        {del && (
          <CloseIcon
            width={20}
            height={20}
            fill="#3733FF"
            onClick={() => navigate("/result")}
          />
        )}
      </RightDiv>
    </TopDiv>
  );
};

export default CardTitleBoard;

const TopDiv = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5.6rem;
  padding: 0 2rem 0 4rem;

  border-radius: 1.2rem 1.2rem 0px 0px;
  /* border: 1px solid var(--purple-300, #cdccff); */

  background: ${({ color }) => color};
  box-shadow: 0px 6px 10px 2px rgba(192, 214, 255, 0.25);
`;

const InfoDiv = styled.div<{ color: string }>`
  color: ${({ color }) => color};

  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

const InterviewState = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
  letter-spacing: -0.06px;
`;

const Title = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.042px;
`;

const RightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const FinBtn = styled.button`
  display: flex;
  padding: 6px 26px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 16px;
  background: var(--purple-600, #3733ff);
  color: var(--Gray-100, #fff);

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 155%; /* 21.7px */
  letter-spacing: -0.042px;

  box-shadow: 0px 0px 6px 2px rgba(215, 215, 215, 0.15);
`;
