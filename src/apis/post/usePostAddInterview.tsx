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
      for (let i = 0; i < data.emails.length; i++) {
        const email = data.emails[i];
        if (!email.endsWith('@gmail.com')) {
          alert('올바른 Gmail 주소가 아닙니다: ' + email);
          throw new Error('올바른 Gmail 주소가 아닙니다: ' + email);
        }
      }

      if (
        data.emails.length === 0 ||
        data.name === '' ||
        data.area === '' ||
        data.position === ''
      ) {
        alert('입력을 완료해주세요!');
        throw new Error('입력을 완료해주세요!');
      }
      const res = await axiosInstance.post(`/api/interviews`, data);
      //응답 처리
      //console.log(res);
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
