import { useMutation } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 공통질문 전송
 * @param {questions, projectId}
 * @returns
 */

interface IndivQuestionsProps {
  content: string;
  applicantId: number;
  commentTargetId?: number;
}

export const usePostIndivQuestions = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ["indivQuestions"],
    mutationFn: async (data: IndivQuestionsProps) => {
      const res = await axiosInstance.post(`/api/questions/individual`, data);
      return res.data;
    },
  });

  return {
    indivQuestions: mutate,
    isPending,
    isSuccess,
    error,
  };
};
