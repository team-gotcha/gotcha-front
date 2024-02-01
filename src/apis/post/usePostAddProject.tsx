import { useMutation } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfo } from '../get/useGetUserInfo';
import { useGetProjectList } from '../get/useGetProjectList';

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
      for (let i = 0; i < data.emails.length; i++) {
        const email = data.emails[i];
        if (!email.endsWith('@gmail.com')) {
          alert('올바른 Gmail 주소가 아닙니다: ' + email);
          throw new Error('올바른 Gmail 주소가 아닙니다: ' + email);
        }
      }
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
