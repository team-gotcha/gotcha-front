import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * email null일때입력
 * @param
 * @returns
 */

interface EmailProps {
  email: string;
}

export const usePatchUserEmail = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ['setUserEmail'],
    mutationFn: async (data: EmailProps) => {
      const res = await axiosInstance.patch(`/api/user/email`, data);
      console.log(res);
      return res.data;
    },
  });

  return {
    setUserEmail: mutate,
    isPending,
    isSuccess,
    error,
  };
};
