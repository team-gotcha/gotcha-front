import { useMutation } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 면접 때 질문하기 체크
 * @param
 * @returns
 */

interface OpenQuestionsProps {
  questionId: number;
}

export const usePatchQOpen = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ["setQuestions"],
    mutationFn: async (data: OpenQuestionsProps) => {
      const res = await axiosInstance.patch(
        `/api/questions/asking-flags`,
        data
      );
      console.log(res);
      return res.data;
    },
  });

  return {
    setQuestions: mutate,
    isPending,
    isSuccess,
    error,
  };
};
