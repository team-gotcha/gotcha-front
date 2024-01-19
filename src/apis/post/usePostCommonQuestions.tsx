import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 공통질문 전송
 * @param {questions, projectId}
 * @returns
 */

interface CommonQuestionsProps {
  questions: Array<String>;
  projectId: number;
}

export const usePostCommonQuestions = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ['commonQuestions'],
    mutationFn: async (data: CommonQuestionsProps) => {
      const res = await axiosInstance.post(`/api/questions/common`, data);
      return res.data;
    },
  });

  return {
    commonQuestions: mutate,
    isPending,
    isSuccess,
    error,
  };
};
