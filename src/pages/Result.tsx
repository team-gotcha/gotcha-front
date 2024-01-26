import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import ResultInfoItem from "../components/cardview/ResultInfoItem";

import { useGetFinApplicants } from "../apis/get/useGetFinApplicants";

const Result = () => {
  let { interview_id } = useParams();
  const InterviewIdNumber: number = parseInt(interview_id, 10);
  const [results, setResults] = useState([]);

  const finApplicantsData = useGetFinApplicants(InterviewIdNumber);
  console.log(finApplicantsData);

  useEffect(() => {
    if (!finApplicantsData.isLoading) {
      setResults(finApplicantsData.allFinApplicants);
    }
  }, [!finApplicantsData.isLoading]);

  return (
    <Wrapper>
      <Background />
      <Container>
        {results.map((data, index) => (
          <ResultInfoItem key={index} /> //data 넘겨줘서 띄우기
        ))}
        <ResultBtn>합격자 선정 완료</ResultBtn>
      </Container>
    </Wrapper>
  );
};

export default Result;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  height: 100%;
  overflow: hidden;

  padding-bottom: 6rem;
`;

const Background = styled.div`
  position: fixed;
  z-index: 5;
  width: 100%;
  height: 100%;
  background: var(--gray-background-gray-55, rgba(50, 50, 50, 0.55));
  backdrop-filter: blur(6px);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 0.5rem 1.35rem 0.5rem 4rem;
  margin: 4.5rem 2.8rem 4.5rem 0;

  z-index: 10;
  overflow-y: auto;
  width: 100%;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #e6e6e6; /* 스크롤바의 색상 */

    border-radius: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const ResultBtn = styled.button`
  display: flex;
  width: 60rem;
  height: 5.6rem;
  padding: 0.8rem 4.2rem;
  justify-content: center;
  align-items: center;

  border-radius: 22px;
  background: var(--purple-600, #3733ff);

  color: var(--Gray-100, #fff);

  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 28.8px */
`;
