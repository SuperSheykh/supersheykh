import { create } from 'zustand';
import type { User } from 'better-auth';

type AuthState = {
  user: User | null | undefined;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: undefined,
  isLoading: true,
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
