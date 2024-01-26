import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 프로젝트 참여자 이메일 리스트 조회
 * @param projectId
 * @returns memberEmailList
 */
export const useGetProjectMembers = (projectId: string) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['projectMembers', projectId],
    queryFn: async () => {
      let res;
      if (projectId) {
        res = await axiosInstance.get(`/api/projects/${projectId}/emails`);
      } else {
        return false;
      }

      return res.data;
    },
  });

  return {
    projectMembers: data || null,
    isLoading,
    error,
  };
};
