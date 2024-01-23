import { useMutation } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 준비 완료 신호 전송
 * @param {questions, projectId}
 * @returns
 */

export const usePostUserReady = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ["readytopost"],
    mutationFn: async (applicantId: number) => {
      const res = await axiosInstance.post(`/api/applicants/interview-ready`, {
        applicantId: applicantId,
      });
      return res.data;
    },
  });

  return {
    readyToPost: mutate,
    isPending,
    isSuccess,
    error,
  };
};
