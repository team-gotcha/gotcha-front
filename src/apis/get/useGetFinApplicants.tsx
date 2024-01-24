import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 면접 완료된 지원자들 목록 조회
 * @param interview_id
 * @returns
 */
export const useGetFinApplicants = (interview_id: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["allFinApplicants"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/applicants/interview-completed`,
        { params: { "interview-id": interview_id } }
      );
      return res.data;
    },
  });

  return {
    allFinApplicants: data || null,
    isLoading,
    error,
  };
};
