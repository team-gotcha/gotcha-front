import { useMutation } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";

/**
 * 파일 업로드
 * @param {resume, portfolio}
 * @returns
 */

interface filesProps {
  applicantId: number;
  resume?: string;
  portfolio?: string;
}

export const usePostFiles = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ["addFiles"],
    mutationFn: async (data: filesProps) => {
      const res = await axiosInstance.post(`/api/applicants/files`, data);
      console.log(res);
      return res.data;
    },
  });

  return {
    addFiles: mutate,
    isPending,
    isSuccess,
    error,
  };
};
