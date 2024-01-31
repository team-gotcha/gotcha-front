import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 유저 세부 정보 받기
 * @param isLogin
 * @returns {userDetailInfo}
 */
export const useGetUserDetail = (applicant_id: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userDetailInfo"],
    queryFn: async () => {
      if (applicant_id === 0) {
        return null;
      }
      const res = await axiosInstance.get(`/api/applicants/${applicant_id}`);
      return res.data;
    },
  });

  return {
    userInfo: data || null,
    isLoading,
    error,
  };
};
