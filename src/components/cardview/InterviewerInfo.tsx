import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import InterviewerBox from "./interviewerBox";
import KeywordBox from "./KeywordBox";
import LinkIcon from "../../assets/icons/LinkIcon";
import CloseIcon from "../../assets/icons/CloseIcon";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  userDetailInfoState,
  userPostDataState,
  filesDataState,
} from "../../recoil/cardview";
import { useGetUserDetail } from "../../apis/get/useGetUserDetail";

const InterviewerInfo = ({ modify = true, wide = true }) => {
  let { user_id } = useParams();
  const userIdNumber: number = parseInt(user_id, 10);
  let { interview_id } = useParams();

  //입력값 state
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState<number>();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [education, setEducation] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [path, setPath] = useState("");

  //api 연결 관련 코드
  const userDetailInfo = useRecoilValue(userDetailInfoState);
  const setUserDetailInfo = useSetRecoilState(userDetailInfoState);

  const userPostInfo = useRecoilValue(userPostDataState);
  const setUserPostInfo = useSetRecoilState(userPostDataState);

  const setFilesData = useSetRecoilState(filesDataState);
  const [resumeFiles, setResumeFiles] = useState<File>();
  const [portfolioFiles, setPortfolioFiles] = useState<File>();

  //custom hook
  const userDetailData = useGetUserDetail(userIdNumber);

  useEffect(() => {
    if (!userDetailData.isLoading && !modify) {
      console.log(
        "유저 상세 데이터 세팅",

        userIdNumber,
        userDetailData
      );
      setUserDetailInfo(userDetailData.userInfo);
    }
  }, [!userDetailData.isLoading, userDetailInfo]);

  //기본 정보 세팅
  useEffect(() => {
    setUserPostInfo({
      name: name,
      date: date,
      age: age,
      education: education,
      position: position,
      phoneNumber: phoneNumber,
      path: path,
      email: email,
      interviewId: interview_id,
    });
  }, [name, date, age, phoneNumber, education, email, position, path]);

  //파일 업로드 정보
  const handleFiles = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: "resume" | "portfolio"
  ) => {
    const selectedFiles = event.target.files;

    if (selectedFiles && selectedFiles.length > 0) {
      const filesArray = Array.from(selectedFiles);

      if (fileType === "resume") {
        setResumeFiles(filesArray[0]);
        setFilesData({
          resume: filesArray[0],
          portfolio: portfolioFiles,
        });
      } else if (fileType === "portfolio") {
        setPortfolioFiles(filesArray[0]);
        setFilesData({
          resume: resumeFiles,
          portfolio: filesArray[0],
        });
      }
    }
  };

  const handleRemoveFile = (fileType: "resume" | "portfolio") => {
    if (fileType === "resume") {
      setResumeFiles(null);
      setFilesData({
        resume: null,
        portfolio: portfolioFiles,
      });
    } else if (fileType === "portfolio") {
      setPortfolioFiles(null);
      setFilesData({
        resume: resumeFiles,
        portfolio: null,
      });
    }
  };

  const handleDocsClick = (url: string) => {
    // 특정 URL을 새 창으로 열기
    window.open(url);
  };

  return (
    <Wrapper wide={wide}>
      <UserProfileDiv>
        <UserProfile></UserProfile>
        {modify ? (
          <UserNameInput
            type="text"
            placeholder="지원자"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></UserNameInput>
        ) : (
          <UserName>{userDetailInfo?.name}</UserName>
        )}
      </UserProfileDiv>
      <InterviewDiv wide={wide}>
        <InterviewBox>
          <InterviewTitle>면접일</InterviewTitle>
          {modify ? (
            <ChoiceDate
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></ChoiceDate>
          ) : (
            <InfoResult>{userDetailInfo?.date}</InfoResult>
          )}
        </InterviewBox>

        <InterviewerBox modify={modify} />
      </InterviewDiv>
      <BasicInfoDiv wide={wide}>
        <InfoBox>
          <Info>나이</Info>
          {modify ? (
            <InfoInput
              value={age}
              pattern="[0-9]*"
              onChange={(e) => setAge(Number(e.target.value))}
            />
          ) : (
            <InfoResult>{userDetailInfo?.age}</InfoResult>
          )}
        </InfoBox>
        <InfoBox>
          <Info>연락처</Info>
          {modify ? (
            <InfoInput
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          ) : (
            <InfoResult>{userDetailInfo?.phoneNumber}</InfoResult>
          )}
        </InfoBox>
        <InfoBox>
          <Info>학력</Info>
          {modify ? (
            <InfoInput
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            />
          ) : (
            <InfoResult>{userDetailInfo?.education}</InfoResult>
          )}
        </InfoBox>
        <InfoBox>
          <Info>이메일</Info>
          {modify ? (
            <InfoInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <InfoResult>{userDetailInfo?.email}</InfoResult>
          )}
        </InfoBox>
        <InfoBox>
          <Info>지원 직무</Info>
          {modify ? (
            <InfoInput
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          ) : (
            <InfoResult>{userDetailInfo?.position}</InfoResult>
          )}
        </InfoBox>
        <InfoBox>
          <Info>지원 경로</Info>
          {modify ? (
            <InfoInput value={path} onChange={(e) => setPath(e.target.value)} />
          ) : (
            <InfoResult>{userDetailInfo?.path}</InfoResult>
          )}
        </InfoBox>
      </BasicInfoDiv>
      <KeywordDiv wide={wide}>
        <KeywordBox modify={modify} title="성향" />
        <KeywordBox modify={modify} title="스킬" />
        <KeywordBox modify={modify} title="경험" />
        <Document>
          <KeyTitle>원본 서류</KeyTitle>
          <DocsDiv>
            {resumeFiles && modify && (
              // <Docs key={index}>{`${file.name}`}</Docs>
              <Docs>
                지원서
                <CloseIcon
                  width={16}
                  height={16}
                  fill="#999999"
                  onClick={() => handleRemoveFile("resume")}
                />
              </Docs>
            )}
            {!modify && (
              <Docs onClick={() => handleDocsClick(userDetailInfo.resumeLink)}>
                지원서
              </Docs>
            )}

            {modify && (
              <>
                <Portfolio htmlFor="file">
                  <LinkIcon width="20" height="20" fill="#999999" />
                  <div>지원서</div>
                </Portfolio>
                <FileInput
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => handleFiles(e, "resume")}
                ></FileInput>
              </>
            )}
            {portfolioFiles && modify && (
              <Docs>
                포트폴리오
                <CloseIcon
                  width={16}
                  height={16}
                  fill="#999999"
                  onClick={() => handleRemoveFile("portfolio")}
                />
              </Docs>
            )}
            {!modify && (
              <Docs onClick={() => handleDocsClick(userDetailInfo.portfolio)}>
                포트폴리오
              </Docs>
            )}

            {modify && (
              <>
                <Portfolio htmlFor="portfolio">
                  <LinkIcon width="20" height="20" fill="#999999" />
                  <div>포트폴리오</div>
                </Portfolio>
                <FileInput
                  type="file"
                  name="portfolio"
                  id="portfolio"
                  onChange={(e) => handleFiles(e, "portfolio")}
                ></FileInput>
              </>
            )}
          </DocsDiv>
        </Document>
      </KeywordDiv>
    </Wrapper>
  );
};

export default InterviewerInfo;

const Wrapper = styled.div<{ wide: boolean }>`
  padding: ${({ wide }) => (wide ? "6.8rem 3.5rem" : "2.5rem 2.1rem")};
  /* padding: ${({ wide }) => (wide ? "0" : "2.5rem 2.1rem")}; */
`;

const UserProfileDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 3.6rem;
  width: 24rem;
`;

const UserProfile = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;

  background-color: var(--blue-200, #e5ecff);
`;

const FontStyle = styled.div`
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
`;

const UserName = styled(FontStyle)`
  color: var(--purple-900, #161466);
  font-size: 36px;
  width: 16rem;
`;

const UserNameInput = styled.input`
  color: var(--purple-900, #161466);
  font-size: 36px;
  width: 16rem;

  border: none;
  outline: none;

  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  line-height: 155%;

  &::placeholder {
    color: var(--Gray-300, #e6e6e6);
  }
`;

const InterviewDiv = styled.div<{ wide: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ wide }) => (wide ? "repeat(2, 1fr)" : "1fr")};
  gap: 2rem 4.5rem;
  margin: 3rem 0 5.5rem;
`;

const InterviewBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 0.3rem;
  gap: 4rem;
`;

const InterviewTitle = styled(FontStyle)`
  color: var(--purple-600, #3733ff);
  width: 5.5rem;
  font-size: 14px;
`;

const ChoiceDate = styled.input`
  border: none;
`;

const BasicInfoDiv = styled.div<{ wide: boolean }>`
  display: grid;
  grid-template-columns: ${({ wide }) => (wide ? "repeat(2, 1fr)" : "1fr")};
  gap: 1.2rem 3.8rem;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3.2rem;
`;

const Info = styled(FontStyle)`
  color: var(--Gray-1100, #1a1a1a);
  width: 5.2rem;
  font-size: 14px;
`;

const InfoResult = styled(FontStyle)`
  color: var(--Gray-1100, #1a1a1a);
  width: 23.8rem;
  text-align: start;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: -0.042px;
`;

const InfoInput = styled.input`
  display: flex;
  padding: 0.2rem 1rem;
  width: 238px;
  height: 24px;
  justify-content: flex-start;
  align-items: center;
  align-items: center;

  border-radius: 0.4rem;
  border: 0.04rem solid var(--purple-100, #f3f2ff);
  background: var(--Gray-200, #f6f6f6);
`;

const KeywordDiv = styled.div<{ wide: boolean }>`
  display: grid;
  grid-template-columns: ${({ wide }) => (wide ? "repeat(2, 1fr)" : "1fr")};
  gap: 3.4rem 3.6rem;
  margin: 5rem 0 0;
`;

const Document = styled.div``;

const DocsDiv = styled.div`
  display: flex;
  align-items: center;
  width: 30rem;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const KeyTitle = styled.div`
  margin-bottom: 0.8rem;
  color: var(--Gray-1100, #1a1a1a);

  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%;
`;

const Docs = styled.div`
  display: flex;
  padding: 0.2rem 1rem;
  text-overflow: ellipsis;
  align-items: center;
  justify-content: center;
  gap: 4px;

  border-radius: 20px;
  border: 1px solid var(--purple-600, #3733ff);
  background: var(--Gray-100, #fff);

  color: var(--purple-600, #3733ff);

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
  letter-spacing: -0.036px;

  cursor: pointer;
`;

const Portfolio = styled.label`
  display: flex;
  padding: 2px 10px;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  border-radius: 20px;
  background: var(--Gray-200, #f6f6f6);

  color: var(--Gray-500, #b3b3b3);

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
  letter-spacing: -0.036px;
`;

const FileInput = styled.input`
  display: none;
`;
