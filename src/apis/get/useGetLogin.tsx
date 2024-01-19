import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 구글로그인
 * @param
 * @returns {userId, accessToken, refreshToken }
 */
export const useGetLogin = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['googleLogin'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/login/google`);
      return res.data;
    },
  });

  return {
    googleLogin: data || null,
    isLoading,
    error,
  };
};
