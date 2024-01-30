import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

import AddIcon from "../../assets/icons/AddIcon";
import { ReactComponent as FavIcon } from "../../assets/images/FavIcon.svg";
import { ReactComponent as NotiIcon } from "../../assets/images/NotiIcon.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalContent, modalState } from "../../recoil/modal";
import { useToggleModal } from "../../hooks/useToggleModal";
import AddProjectModal from "../common/modal/AddProjectModal";
import { loginState, userInfoState } from "../../recoil/userInfo";
import { useGetUserInfo } from "../../apis/get/useGetUserInfo";
import { useGetProjectList } from "../../apis/get/useGetProjectList";
import AddInterviewModal from "../common/modal/AddInterviewModal";
import { useLocation, useNavigate } from "react-router-dom";
import ShareIcon from "../../assets/icons/ShareIcon";
import ListIcon from "../../assets/icons/ListIcon";
import BoardIcon from "../../assets/icons/BoardIcon";
import { interviewModeState } from "../../recoil/mainview";
import CommonGroupMembers from "../common/CommonGroupMembers";
import { useGetProjectMembers } from "../../apis/get/useGetProjectMembers";
import { useGetViewer } from "../../apis/get/useGetViewer";

const NavigationBar = () => {
  const isModalOpen = useRecoilValue(modalState);
  const { openModal } = useToggleModal();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [modalItem, setModalItem] = useRecoilState(modalContent);
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [title, setTitle] = useState("");
  const [isCardview, setIsCardview] = useState(true);
  const [isListView, setIsListView] = useRecoilState(interviewModeState);
  const [memberList, setMemberList] = useState([]);

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (!pathname.includes("main")) {
      setIsCardview(false);
    }
  }, []);

  let interview_id = "";
  let project_id = "";
  let randomColorIdx = 0;
  // pathname에서 interview_id 또는 project_id 추출
  const pathSegments = pathname.split("/");
  if (pathSegments.includes("interview")) {
    const index = pathSegments.indexOf("interview");
    interview_id = pathSegments[index + 1];
    randomColorIdx = Number(interview_id) % 8;
  } else if (pathSegments.includes("ready")) {
    const index = pathSegments.indexOf("ready");
    interview_id = pathSegments[index + 1];
    randomColorIdx = Number(interview_id) % 8;
    // setIsCardview(false);
  } else if (pathSegments.includes("result")) {
    const index = pathSegments.indexOf("result");
    interview_id = pathSegments[index + 1];
    randomColorIdx = Number(interview_id) % 8;
    // setIsCardview(false);
  } else if (pathSegments.includes("inprogress")) {
    const index = pathSegments.indexOf("inprogress");
    interview_id = pathSegments[index + 1];
    randomColorIdx = Number(interview_id) % 8;
    // setIsCardview(false);
  } else if (pathSegments.includes("project")) {
    const index = pathSegments.indexOf("project");
    project_id = pathSegments[index + 1];
    randomColorIdx = Number(project_id) % 8;
  }

  //custom-hook
  const fetchedMembers = useGetProjectMembers(project_id);
  const fetchedInterviewMembers = useGetViewer(Number(interview_id));
  useEffect(() => {
    if (!fetchedMembers.isLoading && project_id !== "") {
      setMemberList(fetchedMembers.projectMembers.emails);
    }
  }, [fetchedMembers.isLoading, project_id]);

  useEffect(() => {
    if (!fetchedInterviewMembers.isLoading && interview_id !== "") {
      console.log(fetchedInterviewMembers.interviewerInfo);
      setMemberList(
        fetchedInterviewMembers.interviewerInfo.map(
          (item: { name: string; id: number; email: string }) => item.email
        )
      );
    }
  }, [fetchedInterviewMembers.isLoading, interview_id]);

  useEffect(() => {
    if (interview_id !== "") {
      const matchingInterview = userInfo.projects
        .flatMap((project) => project.interviews)
        .find(
          (interview) => interview.interviewId === parseInt(interview_id, 10)
        );

      setTitle(matchingInterview ? matchingInterview.interviewName : "");
    } else if (project_id !== "") {
      const matchingProject = userInfo.projects.find(
        (project) => project.projectId === parseInt(project_id, 10)
      );
      setTitle(matchingProject ? matchingProject.projectName : "");
    } else {
      setTitle("갓챠");
    }
  }, [interview_id, project_id, userInfo]);
  return (
    <Wrapper>
      <TopDiv>
        <ProjInfo>
          <Pic randomColorIdx={randomColorIdx} />
          <Title>{title}</Title>
        </ProjInfo>
        <IconDiv>
          {project_id ? (
            <CommonGroupMembers
              groupMemberList={memberList}
              showNum={memberList.length}
            />
          ) : (
            <CommonGroupMembers
              groupMemberList={memberList}
              showNum={memberList.length}
            />
          )}
          <ShareIcon />
        </IconDiv>
      </TopDiv>
      {isCardview && (
        <NavBox>
          <NavItem
            onClick={() => {
              setIsListView(true);
            }}
            isActive={isListView ? true : false}
          >
            <ListIcon
              width="16"
              height="16"
              fill={isListView ? "#3733ff" : "#CCC"}
            />
            목록
          </NavItem>
          <NavItem
            onClick={() => {
              setIsListView(false);
            }}
            isActive={isListView ? false : true}
          >
            <BoardIcon
              width="16"
              height="16"
              fill={!isListView ? "#3733ff" : "#CCC"}
            />
            보드
          </NavItem>
        </NavBox>
      )}
    </Wrapper>
  );
};

export default NavigationBar;

const Wrapper = styled.section`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  top: 5.8rem;
  left: 31.2rem;
  width: calc(100% - 31.2rem);
  height: 10rem;
  flex-shrink: 0;
  padding: 2rem 6rem 0 2.7rem;
  background-color: #fff;
  z-index: 8;
`;

const TopDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProjInfo = styled.div`
  display: flex;
  gap: 1.6rem;
`;

const getRandomColor = (randomColorIdx: number) => {
  const themeColors = [
    "blue1",
    "blue2",
    "blue3",
    "blue4",
    "blue5",
    "blue6",
    "blue7",
    "blue8",
  ];
  const randomColor = themeColors[randomColorIdx];
  return randomColor;
};

const Pic = styled.div<{ randomColorIdx: number }>`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: ${(props) =>
    props.theme.profileColor[getRandomColor(props.randomColorIdx)]};
`;

const Title = styled.div`
  color: var(--Gray-1100, #1a1a1a);

  font-size: 2.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 155%;
`;

const IconDiv = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const ImagesContainer = styled.div`
  display: flex;
  overflow: hidden; /* 넘치는 부분 감추기 */
`;

const Image = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  flex-shrink: 0;
  background-color: var(--Gray-300, #e6e6e6);
  border: 0.1rem solid #fff;
  border-radius: 50%;
  margin-right: -10%; /* 겹치는 부분 설정 */
`;

const NavBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.7rem;
`;

const NavItem = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 7rem;
  border-bottom: 0.1rem solid
    ${(props) => (props.isActive ? "#3733ff" : "white")};

  font-size: 1.2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; /* 19.2px */

  //활성화된 뷰
  color: ${(props) => (props.isActive ? "#3733ff" : "#CCC")};
`;
