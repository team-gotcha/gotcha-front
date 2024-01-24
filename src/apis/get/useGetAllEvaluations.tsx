import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 특정 지원자의 총점, 순위, 키워드, 한줄평 조회
 * @param applicant_id
 * @returns
 */
export const useGetAllEvaluations = (applicant_id: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["allEvaluationsInfo"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/applicants/interview-completed/details`,
        {
          params: { "applicant-id": applicant_id },
        }
      );
      return res.data;
    },
  });

  return {
    allEvaluationsInfo: data || null,
    isLoading,
    error,
  };
};
