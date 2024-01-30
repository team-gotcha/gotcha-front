import { useMutation } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 준비 완료 신호 전송
 * @param {questions, projectId}
 * @returns
 */

export const usePostLike = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ["postLike"],
    mutationFn: async (questionId: number) => {
      const res = await axiosInstance.post(`api/questions/${questionId}/like`, {
        "question-id": questionId,
      });
      console.log(res);
      return res.data;
    },
  });

  return {
    postLike: mutate,
    isPending,
    isSuccess,
    error,
  };
};
