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
    age: null as number,
    education: "",
    position: "",
    phoneNumber: "",
    path: "",
    email: "",
    // interviewId: "",
  },
});

export const keywordDataState = atom({
  key: "keywordDataState",
  default: [] as { name: string; keywordType: string }[],
});

export const interviewersDataState = atom({
  key: "interviewersDataState",
  default: [] as { id: number }[],
});

export const questionsIndivDataState = atom({
  key: "questionsIndivDataState",
  default: [] as { content: string }[],
});

export const filesDataState = atom({
  key: "filesDataState",
  default: new FormData(),
});

export const renderState = atom({
  key: "renderState",
  default: 0,
});
