import { create } from "zustand";

export const useUserStore = create((set) => {
  const storedUser = localStorage.getItem("pmoUser");
  let initialUser = null;
  try {
    initialUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse pmoUser from localStorage", error);
    localStorage.removeItem("pmoUser");
  }

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
