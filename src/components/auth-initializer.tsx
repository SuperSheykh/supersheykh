import { useSession } from '@/lib/auth-client';
import { useAuthStore } from '@/store/auth';
import { useEffect } from 'react';

export const AuthInitializer = () => {
  const { data, isPending } = useSession.get();
  const { setUser, setIsLoading } = useAuthStore();

  useEffect(() => {
    if (data) setUser(data.user);
    setIsLoading(isPending);
  }, [data, isPending, setUser, setIsLoading]);

  return null;
};
