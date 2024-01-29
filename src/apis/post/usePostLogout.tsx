import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 로그아웃
 * @param
 * @returns
 */

export const usePostLogout = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const res = await axiosInstance.post(`/api/logout`, {});
      console.log(res);
      return res.data;
    },
  });

  return {
    logout: mutate,
    isPending,
    isSuccess,
    error,
  };
};
