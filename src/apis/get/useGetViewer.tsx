import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 유저 정보 받기
 * @param isLogin
 * @returns {profileImage, name, email}
 */
export const useGetViewer = (interviewId: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["interviewerInfo"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/interviews/${interviewId}/names`
      );
      console.log("면접관 정보", res.data);
      return res.data;
    },
  });

  return {
    interviewerInfo: data || null,
    isLoading,
    error,
  };
};
