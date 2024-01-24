import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 특정 지원자의 모든 질문의 총점과 그에 따른 순위를 조회
 * @param applicant_id
 * @returns
 */
export const useGetRankingPoint = (applicant_id: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["rankingInfo"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/questions/rank`, {
        params: { "applicant-id": applicant_id },
      });
      return res.data;
    },
  });

  return {
    rankingInfo: data || null,
    isLoading,
    error,
  };
};
