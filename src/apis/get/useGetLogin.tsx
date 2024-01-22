import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 구글로그인
 * @param code
 * @returns {userId, accessToken, refreshToken}
 */
export const useGetLogin = (code: string) => {
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['googleLogin'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/google/token?code=${code}`);
      return res.data;
    },
  });

  return {
    googleLogin: data || null,
    isLoading,
    error,
    isSuccess,
  };
};
