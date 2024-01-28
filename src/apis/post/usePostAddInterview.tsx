import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 새 프로젝트 생성
 * @param {name, emails, projectId, area,position}
 * @returns
 */

interface InterviewProps {
  name: string;
  emails: Array<string>;
  projectId: number;
  area: string;
  position: string;
}

export const usePostAddInterview = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ['addInterview'],
    mutationFn: async (data: InterviewProps) => {
      const res = await axiosInstance.post(`/api/interviews`, data);
      //응답 처리
      console.log(res);
      return res.data;
    },
  });

  return {
    addInterview: mutate,
    isPending,
    isSuccess,
    error,
  };
};
