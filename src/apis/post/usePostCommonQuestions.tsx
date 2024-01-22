import { useMutation } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * 공통질문 전송
 * @param {questions, interviewId}
 * @returns
 */

interface CommonQuestionsProps {
  questions: Array<String>;
  interviewId: number;
}

export const usePostCommonQuestions = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ['addCommonQuestions'],
    mutationFn: async (data: CommonQuestionsProps) => {
      const res = await axiosInstance.post(`/api/questions/common`, data);
      return res.data;
    },
  });

  return {
    addCommonQuestions: mutate,
    isPending,
    isSuccess,
    error,
  };
};
