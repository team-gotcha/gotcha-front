import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import CardTitleBoard from '../components/cardview/CardTitleBoard';
import InterviewerInfo from '../components/cardview/InterviewerInfo';
import MemoItem from '../components/cardview/MemoItem';
import MemoInput from '../components/cardview/MemoInput';

import QuestionCheckModal from '../components/cardview/modal/QuestionCheckModal';
import QuestionOpenModal from '../components/cardview/modal/QuestionOpenModal';

import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import {
  filesDataState,
  userPostDataState,
  keywordDataState,
  interviewersDataState,
  renderState,
} from '../recoil/cardview';

import { useGetIndivQuestions } from '../apis/get/useGetIndivQuestions';

import { usePostUserReady } from '../apis/post/usePostUserReady';
import { usePostUserDetail } from '../apis/post/usePostUserDetail';
import { usePatchFiles } from '../apis/patch/usePatchFiles';

//test
interface DetailInfoProps {
  name: string;
  date: string;
  interviewers: { id: string }[];
  age: number;
  education: string;
  position: string;
  phoneNumber: string;
  path: string;
  email: string;
  keywords: { name: string; keywordType: string }[];
  interviewId: string;
}

interface QuestionProps {
  asking: boolean;
  commentTargetId: number;
  content: string;
  id: number;
  writerName: string;
  writerProfile: string;
}

const Ready = () => {
  const navigate = useNavigate();
  let { user_id } = useParams();
  const userIdNumber: number = parseInt(user_id, 10);
  let { interview_id } = useParams();
  const InterviewIdNumber: number = parseInt(interview_id, 10);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState([]);
  const [applicantId, setApplicantId] = useState<number>();
  const [isModify, setIsModify] = useState(true);

  const basicData = useRecoilValue(userPostDataState);
  const interviewData = useRecoilValue(interviewersDataState);
  const keywordData = useRecoilValue(keywordDataState);
  const filesData = useRecoilValue(filesDataState);

  const render = useRecoilValue(renderState);
  const setRender = useSetRecoilState(renderState);

  //custom-hook
  const postReadyData = usePostUserReady();
  const postDetailData = usePostUserDetail();
  const userPatchData = usePatchFiles();

  const getIndivQuestionData = useGetIndivQuestions(userIdNumber, render);

  //user-id 설정
  useEffect(() => {
    if (userIdNumber !== 0) {
      setIsModify(false);
    }
  }, []);

  //로딩되었을 때 댓글 정보 세팅하기
  useEffect(() => {
    if (!getIndivQuestionData.isLoading && !isModify) {
      const newData = getIndivQuestionData.indivQuestion || [];
      if (newData) {
        setComments(
          newData?.filter(
            (comment: QuestionProps) => comment.commentTargetId === null
          )
        );
        setReply(
          newData?.filter(
            (comment: QuestionProps) => comment.commentTargetId !== null
          )
        );
      }
      console.log(render);
    }
  }, [!getIndivQuestionData.isLoading, render]);

  //지원자 정보 post 했을 때 applicantId 받아오기
  useEffect(() => {
    if (postDetailData.isSuccess) {
      console.log(postDetailData.data.applicantId);
      handleAfterPost(Number(postDetailData.data.applicantId));
    }
  }, [postDetailData.isSuccess]);

  const handleAfterPost = async (applicant_id: number) => {
    setApplicantId(Number(applicant_id));
    const newFilesData = new FormData();

    const resumeFile = filesData.resume;
    const portfoliosFile = filesData.portfolio;

    console.log(resumeFile, portfoliosFile);

    newFilesData.append('applicant-id', String(applicant_id));
    newFilesData.append('resume', resumeFile);
    newFilesData.append('portfolio', portfoliosFile);

    userPatchData.addFiles({ filesData: newFilesData });

    setIsModify(false);
    navigate(`/ready/${interview_id}/${applicant_id}`);
    window.location.reload();
  };

  const handleSubmit = async () => {
    if (isModify) {
      postDetailData.detailPost({
        name: basicData.name,
        date: basicData.date,
        interviewers: interviewData,
        age: basicData.age,
        education: basicData.education,
        position: basicData.position,
        phoneNumber: basicData.phoneNumber,
        path: basicData.path,
        email: basicData.email,
        keywords: keywordData,
        interviewId: interview_id,
      });
    }
  };

  const handleNext = () => {
    postReadyData.readyToPost(userIdNumber);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Wrapper>
        <Background />
        <Container>
          <CardTitleBoard btnFunc={handleNext} subFunc={handleSubmit} />
          <Contents>
            <InputDiv>
              <InterviewerInfo modify={isModify} />
            </InputDiv>
            <MemoDiv>
              {comments &&
                comments.map((item, index) => (
                  <MemoItem key={index} item={item} reply={reply} />
                ))}

              {!isModify && <MemoInput />}
            </MemoDiv>
          </Contents>
        </Container>
      </Wrapper>
      {isOpen && (
        <ModalWrapper>
          <ModalBackground onClick={() => setIsOpen(!isOpen)} />
          <QuestionCheckModal
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            setIsOpenModal={setIsOpenModal}
          />
        </ModalWrapper>
      )}
      {isOpenModal && (
        <ModalWrapper2>
          <ModalBackground2 onClick={() => setIsOpenModal(!isOpenModal)} />
          <QuestionOpenModal setIsOpenModal={setIsOpenModal} />
        </ModalWrapper2>
      )}
    </>
  );
};

export default Ready;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
  position: absolute;
  z-index: 5;
  background-color: #fff;
  border-radius: 1.2rem;

  width: 95%;
  height: 84%;

  overflow: hidden;
  border: 1px solid var(--purple-300, #cdccff);
`;

const Contents = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 93%;
`;

const InputDiv = styled.div`
  overflow-y: auto;
  width: 100%;
  /* padding: 6.8rem 3.5rem; */

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MemoDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  // 위 속성 먹이면 스크롤이 안 됨...
  padding: 2rem;
  margin-bottom: 1rem;
  border-left: 0.1rem solid #e6e6e6;
  overflow-y: auto;

  gap: 0.8rem;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
`;

const ModalBackground = styled(Background)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 150;
`;

const ModalWrapper2 = styled(ModalWrapper)`
  z-index: 300;
`;

const ModalBackground2 = styled(ModalBackground)`
  z-index: 150;
`;
