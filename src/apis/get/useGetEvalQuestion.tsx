import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 특정 질문의 모든 평가들을 조회
 * @param question_id
 * @returns
 */
export const useGetEvalQuestion = (question_id: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["evaluationInfo"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/evaluations/questions`, {
        params: { "question-id": question_id },
      });
      return res.data;
    },
  });

  return {
    evaluationInfo: data || null,
    isLoading,
    error,
  };
};
