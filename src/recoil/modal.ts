import { ReactNode } from 'react';
import { atom, selector } from 'recoil';

//Recoil Atom 선언
export const modalState = atom<boolean>({
  key: 'modalState',
  default: false,
});

export const modalContent = atom<ReactNode>({
  key: 'modalContent',
  default: null,
});
