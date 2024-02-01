import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: {
    accessToken: localStorage.getItem('accessToken'),
    expirationTime: localStorage.getItem('expirationTime'),
  },
});
