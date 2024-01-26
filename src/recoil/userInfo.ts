import { ReactNode } from 'react';
import { atom, selector } from 'recoil';

//Recoil Atom 선언
export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    profileUrl: '',
    userEmail: '',
    userName: '',
    projects: [
      {
        interviews: [
          {
            interviewId: 0,
            interviewName: '',
          },
        ],
        projectId: 0,
        projectName: '',
      },
    ],
  },
});

export const defaultProjectId = atom({
  key: 'defaultProjectId',
  default: selector({
    key: 'defaultProjectId/Default',
    get: ({ get }) => {
      const projects = get(userInfoState).projects;
      return projects.length > 0 ? projects[0].projectId : 0;
    },
  }),
});

export const userInfoStateDefaultSelector = selector({
  key: 'userInfoStateDefaultSelector',
  get: ({ get }) => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken !== null && accessToken !== undefined;
  },
});

export const loginStateDefaultSelector = selector({
  key: 'loginStateDefaultSelector',
  get: ({ get }) => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken !== null && accessToken !== undefined;
  },
});

export const loginState = atom<boolean>({
  key: 'loginState',
  default: loginStateDefaultSelector,
});
