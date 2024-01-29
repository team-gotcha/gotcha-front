import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 리프레쉬
 * @param  refreshToken
 * @returns accessToken
 */

export const usePostRefresh = () => {
  const { mutate, isPending, error, isSuccess, data } = useMutation({
    mutationKey: ['refresh'],
    mutationFn: async (data: string) => {
      const res = await axiosInstance.post(`/api/refresh`, { data });
      console.log(res.data);
      return res.data;
    },
  });

  return {
    refresh: mutate,
    isPending,
    isSuccess,
    error,
    data,
  };
};
