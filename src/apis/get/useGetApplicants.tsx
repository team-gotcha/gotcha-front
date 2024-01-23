import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 세부 면접의 모든 지원자를 면접일 순으로 조회
 * @param interview-id
 * @returns id, name, status, date, interviewerEmails[], questionCount, keywords[name, type]
 */
export const useGetApplicants = (interviewId: number) => {
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['applicants'],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/applicants?interview-id=${interviewId}`
      );
      return res.data;
    },
  });

  return {
    applicants: data || null,
    isLoading,
    error,
    isSuccess,
  };
};
