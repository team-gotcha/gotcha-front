import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 사용자 프로젝트
 * @param
 * @returns userEmail,userName,profileUrl,projects
 */
export const useGetProjectList = () => {
  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['projectList'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/projects`);
      return res.data;
    },
  });

  return {
    projectList: data || null,
    isLoading,
    error,
    isSuccess,
  };
};
