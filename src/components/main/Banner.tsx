import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetTodayDate } from '../../hooks/useGetTodayDate';
import { useGetTodayInterviewNum } from '../../apis/get/useGetTodayInterviewNum';

const Banner = () => {
  const todayDate = useGetTodayDate();
  const fetchedData = useGetTodayInterviewNum();
  const [todayInterviewNum, setTodayInterviewNum] = useState(0);
  useEffect(() => {
    if (!fetchedData.isLoading) {
      setTodayInterviewNum(fetchedData.todayInterviewNum.count);
    }
  }, [fetchedData.isLoading]);
  return (
    <Wrapper>
      <BannerDate>{todayDate}</BannerDate>
      <BannerComment>
        {todayInterviewNum === 0
          ? '아직 예정된 면접이 없어요.'
          : `${todayInterviewNum}건의 면접이 예정되어 있습니다.`}
      </BannerComment>
    </Wrapper>
  );
};

export default Banner;

const Wrapper = styled.div`
  width: 100%;
  height: 8rem;
  border-radius: 1.2rem;
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
  gap: 0.3rem;
  flex-shrink: 0;

  padding-left: 2.6rem;
`;

const BannerDate = styled.div`
  color: ${(props) => props.theme.colors.gray.gray100};
  ${(props) => props.theme.fontStyles.title.titleRegular};
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: -0.06px;
`;

const BannerComment = styled.div`
  color: ${(props) => props.theme.colors.gray.gray100};
  ${(props) => props.theme.fontStyles.subtitle.subtitleBold};
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.048px;
`;
