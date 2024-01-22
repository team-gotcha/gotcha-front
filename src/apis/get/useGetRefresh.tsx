import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axiosInstance from '..';
import { useNavigate } from 'react-router-dom';

/**
 * userId로 accessToken재발급
 * @param userId
 * @returns access_token, expires_in
 */
export const useGetRefresh = (userId: string) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ['refreshedAccessToken'],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/refresh?userId=${userId}`);
      return res.data;
    },
  });

  return {
    refreshedAccessToken: data || null,
    isLoading,
    error,
  };
};
