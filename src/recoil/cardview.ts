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
    // keywords: [{ name: "", keywordType: "" }],
    traitKeywords: [""],
    interviewId: "",
    questions: [{ content: "" }],
  },
});
