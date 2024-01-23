import { atom, selector } from "recoil";

export const userDetailInfoState = atom({
  key: "userDetailInfoState",
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
    questions: [{ content: "" }],
  },
});

export const keywordDataState = atom({
  key: "keywordDataState",
  default: [{ name: "", keywordType: "" }],
});

export const questionsIndivDataState = atom({
  key: "questionsIndivDataState",
  default: [{ content: "" }],
});

export const filesDataState = atom({
  key: "filesDataState",
  default: {
    resume: [] as File[],
    portfolios: [] as File[],
  },
});
