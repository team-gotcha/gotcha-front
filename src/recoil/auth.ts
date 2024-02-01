import { atom } from 'recoil';

// Set the default expiration time to 25 minutes
const defaultExpirationTime = new Date().getTime() + 25 * 60 * 1000;

export const authState = atom({
  key: 'authState',
  default: {
    accessToken: localStorage.getItem('accessToken'),
    expirationTime:
      localStorage.getItem('expirationTime') || defaultExpirationTime,
  },
});
