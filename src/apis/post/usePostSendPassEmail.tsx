import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 유저 정보 전송
 * @param interviewId
 * @returns
 */

export const usePostSendPassEmail = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ['sendPassEmail'],
    mutationFn: async (interviewId: number) => {
      const res = await axiosInstance.post(`/api/applicants/send-email`, {
        interviewId: interviewId,
      });
      return res.data;
    },
  });

  return {
    sendPassEmail: mutate,
    isPending,
    isSuccess,
    error,
  };
};
