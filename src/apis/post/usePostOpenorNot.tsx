import { useMutation } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 질문 공개 여부 전송
 * @param {questions, projectId}
 * @returns
 */

export const usePostOpenorNot = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ["setIsOpen"],
    mutationFn: async ({
      applicantId,
      agree,
    }: {
      applicantId: number;
      agree: boolean;
    }) => {
      const res = await axiosInstance.post(
        `/api/applicants/${applicantId}/public`,
        {
          agree: agree,
        }
      );
      console.log(res.data);
      return res.data;
    },
  });

  return {
    setIsOpen: mutate,
    isPending,
    isSuccess,
    error,
  };
};
