import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../../recoil/auth';
import axios from 'axios';

const TokenRefresher = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const checkAndRefreshToken = async () => {
    const currentTime = new Date().getTime();

    if (currentTime > Number(auth.expirationTime)) {
      try {
        console.log('accessToken만료예정!');
        // refreshToken 등을 사용하여 새로운 accessToken을 얻어오는 API 호출
        const refreshToken = localStorage.getItem('refreshToken');
        axios
          .post(`${process.env.REACT_APP_API_URL}api/refresh`, {
            refreshToken: refreshToken,
          })
          .then((res) => {
            //임시로 localStorage에 더미 데이터 저장
            const newAccessToken = res.data.access_token;
            console.log(`새 accessToken저장!:${newAccessToken}`);
            // 얻어온 새로운 accessToken으로 상태 및 localStorage 갱신
            setAuth({
              ...auth,
              accessToken: newAccessToken,
              expirationTime: String(new Date().getTime() + 25 * 60 * 1000),
            });
            localStorage.setItem('accessToken', newAccessToken);
            localStorage.setItem(
              'expiredTime',
              String(new Date().getTime() + 25 * 60 * 1000)
            );
          });
      } catch (error) {
        // 오류 처리
        console.error('Error refreshing token:', error);
      }
    } else {
      console.log('안전한 토큰~');
    }
  };
  useEffect(() => {
    console.log('Refresh Check Mount');
    // 주기적으로 checkAndRefreshToken 함수 호출 (예: 1분마다)
    const refreshInterval = setInterval(checkAndRefreshToken, 1 * 60 * 1000);

    // 컴포넌트 언마운트 시 clearInterval
    return () => clearInterval(refreshInterval);
  }, []);

  return <></>;
};

export default TokenRefresher;
