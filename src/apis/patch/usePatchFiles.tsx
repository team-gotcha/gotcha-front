import { useMutation } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "..";

/**
 * 파일 업로드
 * @param {resume, portfolio}
 * @returns
 */

interface filesProps {
  filesData: FormData;
}

export const usePatchFiles = () => {
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationKey: ["addFiles"],
    mutationFn: async (filesData: filesProps) => {
      const res = await axiosInstance.patch(
        `/api/applicants/files`,
        filesData.filesData
      );
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
