import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 오늘의 예정 면접 수 조희
 * @param
 * @returns todayInterviewNum
 */
export const useGetTodayInterviewNum = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['todayInterviewNum'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/todays-interview`);

      return res.data;
    },
  });

  return {
    todayInterviewNum: data || null,
    isLoading,
    error,
  };
};
