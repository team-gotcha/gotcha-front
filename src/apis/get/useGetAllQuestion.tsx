import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 면접 중 지원자의 모든 질문 목록 순서대로 조회
 * @param applicant_id
 * @returns
 */
export const useGetAllQuestion = (applicant_id: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["allQuestion"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/questions/in-progress`, {
        params: { "applicant-id": applicant_id },
      });
      return res.data;
    },
  });

  return {
    allQuestion: data || null,
    isLoading,
    error,
  };
};
