import { atom, selector } from "recoil";

export const userDetailInfoState = atom({
  key: "userDetailInfoState",
  default: {
    name: "",
    date: "",
    interviewerNames: [""],
    age: 0,
    education: "",
    position: "",
    phoneNumber: "",
    path: "",
    email: "",
    traitKeywords: [""],
    skillKeywords: [""],
    experienceKeywords: [""],
    interviewId: "",
    questions: [{ content: "" }],
  },
});

export const userPostDataState = atom({
  key: "userPostDataState",
  default: {
    name: "",
    date: "",
    interviewers: [{ id: "" }],
    age: 0,
    education: "",
    position: "",
    phoneNumber: "",
    path: "",
    email: "",
    keywords: [{ name: "", keywordType: "" }],
    interviewId: "",
  },
});

export const keywordDataState = atom({
  key: "keywordDataState",
  default: [{ name: "", keywordType: "" }],
});

export const interviewersDataState = atom({
  key: "interviewersDataState",
  default: [{ email: "", id: 0, name: "" }],
});

export const questionsIndivDataState = atom({
  key: "questionsIndivDataState",
  default: [{ content: "" }],
});

export const filesDataState = atom({
  key: "filesDataState",
  default: new FormData(),
});

export const renderState = atom({
  key: "renderState",
  default: 0,
});
