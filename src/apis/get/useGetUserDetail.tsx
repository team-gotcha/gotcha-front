import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 유저 세부 정보 받기
 * @param isLogin
 * @returns {userDetailInfo}
 */
export const useGetUserDetail = (isLogin: boolean, applicant_id: number) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["userDetailInfo", isLogin],
    queryFn: async () => {
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
