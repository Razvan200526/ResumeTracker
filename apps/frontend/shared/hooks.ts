import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { backend } from './backend';

export const useAuth = () => {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ['auth', 'retrieve'],
    queryFn: async () => {
      const response = await backend.auth.retrieve();
      if (response.isServerError) {
        return null;
      }
      if (response.isUnauthorized || response.isForbidden) {
        navigate('/signin');
        return null;
      }

      return response.data.user || null;
    },
  });
};
