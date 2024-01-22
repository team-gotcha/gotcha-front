import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 유저 정보 받기
 * @param isLogin
 * @returns {profileImage, name, email}
 */
export const useGetUserInfo = (isLogin: boolean) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['userInfo', isLogin],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/user`);
      return res.data;
    },
  });

  return {
    userInfo: data || null,
    isLoading,
    error,
  };
};
