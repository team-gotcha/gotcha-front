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
      console.log("넣는 값 :", filesData.filesData);
      const res = await axiosInstance.patch(
        `/api/applicants/files`,
        filesData.filesData
      );
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
