import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { modalState } from '../../recoil/modal';
import { usePostAddInterview } from '../post/usePostAddInterview';

/**
 * 사용자 프로젝트
 * @param
 * @returns userEmail,userName,profileUrl,projects
 */

export const useGetProjectList = () => {
  const isModalOpen = useRecoilValue(modalState);

  const { isLoading, data, error, isSuccess } = useQuery({
    queryKey: ['projectList', isModalOpen],
    queryFn: async () => {
      console.log('프로젝트 데이터 받기');
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
