import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 면접 전 지원자의 모든 개별 질문 목록 조회
 * @param applicant_id
 * @returns
 */
export const useGetCheckQuestions = (applicant_id: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["checkQuestion"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/questions/preparatory`, {
        params: { "applicant-id": applicant_id },
      });
      console.log(res.data);
      return res.data;
    },
  });

  return {
    checkQuestion: data || null,
    isLoading,
    error,
  };
};
