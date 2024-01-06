import React, { useState } from 'react';
import { styled } from 'styled-components';

const Banner = () => {
  return (
    <Wrapper>
      <BannerDate>2023년 12월 12일 화요일</BannerDate>
      <BannerComment>아직 예정된 면접이 없어요.</BannerComment>
    </Wrapper>
  );
};

export default Banner;

const Wrapper = styled.div`
  width: 90%;
  height: 5rem;
  border-radius: 0.75rem;
  background: linear-gradient(
    92deg,
    #001c46 0.29%,
    #3733ff 46.71%,
    #afcfff 84%
  );

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;

  padding-left: 1.63rem;
`;

const BannerDate = styled.div`
  color: ${(props) => props.theme.colors.gray.gray100};
  font-style: ${(props) => props.theme.fontStyles.title.titleRegular};
  font-size: 1.25rem;
  font-weight: 400;
`;

const BannerComment = styled.div`
  color: ${(props) => props.theme.colors.gray.gray100};
  font-style: ${(props) => props.theme.fontStyles.subtitle.subtitleBold};
  font-size: 1rem;
  font-weight: 700;
`;
