import { ReactNode } from 'react';
import { atom, selector } from 'recoil';

//Recoil Atom 선언
export const interviewModeState = atom<boolean>({
  key: 'interviewModeState',
  default: true, //interviewModeState? list : board
});
