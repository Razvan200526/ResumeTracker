import { backend } from '@frontend/shared/backend';
import { queryClient } from '@frontend/shared/QueryClient';
import type { ResumeType } from '@sdk/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useResumes = (userId: string) => {
  return useQuery({
    queryKey: ['resumes', userId],
    queryFn: async () => {
      const response = await backend.resume.resumes.retrieve({ userId });

      return response.data as ResumeType[];
    },
  });
};

export const useAddResume = (userId: string) => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      return backend.upload.resume.uploadResume(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['resumes', userId],
      });
    },
  });
};
