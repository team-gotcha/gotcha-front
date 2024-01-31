import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 면접 전 지원자의 모든 개별 질문 목록 조회
 * @param applicant_id
 * @returns
 */
export const useGetIndivQuestions = (applicant_id: number, render: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["indivQuestion", render],
    queryFn: async () => {
      if (applicant_id === 0) {
        return null;
      }
      const res = await axiosInstance.get(`/api/questions`, {
        params: { "applicant-id": applicant_id },
      });

      return res.data;
    },
  });

  return {
    indivQuestion: data || null,
    isLoading,
    error,
  };
};
