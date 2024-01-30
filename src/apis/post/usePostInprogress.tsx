import { useMutation } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 준비 완료 신호 전송
 * @param {questions, projectId}
 * @returns
 */

export const usePostInprogress = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ["readyToProgress"],
    mutationFn: async (applicantId: number) => {
      const res = await axiosInstance.post(
        `api/applicants/${applicantId}/entering-interview`,
        {
          "applicant-id": applicantId,
        }
      );
      console.log(res);
      return res.data;
    },
  });

  return {
    readyToProgress: mutate,
    isPending,
    isSuccess,
    error,
  };
};
