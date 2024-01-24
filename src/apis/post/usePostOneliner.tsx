import { useMutation } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";
import { useNavigate } from "react-router-dom";

/**
 * 한줄평 전송
 * @param {applicantId, content}
 * @returns
 */

interface OnelinerProps {
  applicantId: number;
  content: string;
}

export const usePostOneliner = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ["addOneliner"],
    mutationFn: async (data: OnelinerProps) => {
      const res = await axiosInstance.post(`/api/evaluations/one-liner`, data);
      console.log(res);
      return res.data;
    },
  });

  return {
    addOneliner: mutate,
    isPending,
    isSuccess,
    error,
  };
};
