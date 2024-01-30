import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 탈락 지원자 상태 업데이트
 * @param interview-id
 * @returns
 */

export const usePatchInterviewComplete = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ['interviewComplete'],
    mutationFn: async (data: string) => {
      const res = await axiosInstance.patch(
        `/api/applicants/interview-completed?interview-id=${data}`,
        {}
      );
      console.log(res);
      return res.data;
    },
  });

  return {
    interviewComplete: mutate,
    isPending,
    isSuccess,
    error,
  };
};
