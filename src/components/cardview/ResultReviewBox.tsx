import React, { useState } from "react";
import { styled } from "styled-components";

const ResultReviewBox = () => {
  return (
    <Container>
      <ScoreBox>
        <ReviewScore></ReviewScore>
        <TotalScore></TotalScore>
      </ScoreBox>
      <Comments>
        전체 <span>2위</span>인 면접자입니다. <span>다양한 경험, 꼼꼼한</span>{" "}
        의 키워드를 가지고 있어요.
      </Comments>
      <ReviewBox>
        <Reviews>
          <Profile />
          <ReviewCom>한줄평</ReviewCom>
        </Reviews>
        <Reviews>
          <Profile />
          <ReviewCom>한줄평</ReviewCom>
        </Reviews>
        <Reviews>
          <Profile />
          <ReviewCom>한줄평</ReviewCom>
        </Reviews>
        <Reviews>
          <Profile />
          <ReviewCom>한줄평</ReviewCom>
        </Reviews>
      </ReviewBox>
    </Container>
  );
};

export default ResultReviewBox;

const Container = styled.div``;

const ScoreBox = styled.div``;

const ReviewScore = styled.div``;

const TotalScore = styled.div``;

const Comments = styled.div``;

const ReviewBox = styled.div``;

const Reviews = styled.div``;

const Profile = styled.img``;

const ReviewCom = styled.div``;
