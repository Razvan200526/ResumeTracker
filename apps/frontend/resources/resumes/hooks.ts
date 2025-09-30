import { backend } from '@frontend/shared/backend';
import type { ResumeType } from '@sdk/types';
import { useQuery } from '@tanstack/react-query';

export const useResumes = (userId: string) => {
  return useQuery({
    queryKey: ['resumes', userId],
    queryFn: async () => {
      const response = await backend.resume.resumes.retrieve({ userId });

      return response.data as ResumeType[];
    },
  });
};

// export const useAddResume = (userId: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (file: File) => {
//       return backend.resume.create({ userId, file });
//     },
//   });
// };
