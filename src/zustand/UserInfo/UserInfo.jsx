import { create } from "zustand";

export const useUserStore = create((set) => {
  const storedUser = localStorage.getItem("pmoUser");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    pmoUser: initialUser,
    logout: () => {
      localStorage.removeItem("pmoUser");
      set({ pmoUser: null });
    },
    setUser: (pmoUser) => {
      localStorage.setItem("pmoUser", JSON.stringify(pmoUser));
      set({ pmoUser });
    },
  };
});
