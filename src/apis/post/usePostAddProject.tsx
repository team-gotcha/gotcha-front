import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 새 프로젝트 생성
 * @param {name, emails}
 * @returns
 */

interface ProjectProps {
  name: string;
  emails: Array<string>;
}

export const usePostAddProject = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ['addProject'],
    mutationFn: async (data: ProjectProps) => {
      const res = await axiosInstance.post(`/api/projects`, data);
      return res.data;
    },
  });

  return {
    addProject: mutate,
    isPending,
    isSuccess,
    error,
  };
};
