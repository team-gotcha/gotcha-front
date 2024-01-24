import { useMutation } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 질문에 대한 답변 전송
 * @param {questions, projectId}
 * @returns
 */

interface QCommentsProps {
  questionId: number;
  score: number;
  content: string;
}

export const usePostQueComment = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ["addQComment"],
    mutationFn: async (data: QCommentsProps) => {
      const res = await axiosInstance.post(`/api/evaluations`, [data]);
      console.log(res);
      return res.data;
    },
  });

  return {
    addQComment: mutate,
    isPending,
    isSuccess,
    error,
  };
};
