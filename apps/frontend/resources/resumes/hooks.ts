import { backend } from '@frontend/shared/backend';
import { queryClient } from '@frontend/shared/QueryClient';
import type { CoverLetterType, ResumeType } from '@sdk/types';
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

export const useCoverLetters = (userId: string) => {
  return useQuery({
    queryKey: ['coverletter', userId],
    queryFn: async () => {
      const response = await backend.coverLetter.coverletter.retrieve({
        userId,
      });
      return response.data as CoverLetterType[];
    },
  });
};
export const useAddCoverLetter = (userId: string) => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      return backend.upload.coverLetter.upload(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['coverletter', userId],
      });
    },
  });
};
export const useDeleteResumes = (userId: string) => {
  return useMutation({
    mutationFn: async (ids: string[]) => {
      // Convert string IDs to numbers for the backend
      const resumeIds = ids.map((id) => Number.parseInt(id, 10));
      return backend.resume.resumes.delete({
        resumeIds: resumeIds,
        userId: userId,
      });
    },
    onSuccess: (response) => {
      if (response.success) {
        // Invalidate the resumes query to refresh the list
        queryClient.invalidateQueries({
          queryKey: ['resumes', userId],
        });
      }
    },
  });
};

export const useDeleteCoverLetters = (userId: string) => {
  return useMutation({
    mutationFn: async (ids: string[]) => {
      const coverLetterIds = ids.map((id) => Number.parseInt(id, 10));
      return backend.coverLetter.coverletter.delete({
        coverletterIds: coverLetterIds,
        userId: userId,
      });
    },
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({
          queryKey: ['coverletter', userId],
        });
      }
    },
  });
};
