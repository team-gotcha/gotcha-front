import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 합격자 명단 조회
 * @param interviewId
 * @returns [
  {
    "id": 0,
    "name": "string",
    "score": 0,
    "rank": 0,
    "keywords": [
      "string"
    ],
    "favorite": true
  }
]
 */
export const useGetPassApplicants = (interviewId: number) => {
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['passApplicants', interviewId],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/applicants/pass?interview-id=${interviewId}`
      );
      return res.data;
    },
  });

  return {
    passApplicants: data || null,
    isLoading,
    error,
    isSuccess,
  };
};
