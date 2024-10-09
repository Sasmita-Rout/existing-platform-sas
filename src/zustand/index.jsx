import { create } from "zustand";

export const useUserStore = create((set) => {
  const storedUser = localStorage.getItem("user");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    user: initialUser,
    logout: () => set({ user: null }),
    setUser: (user) => set({ user }),
  };
});
