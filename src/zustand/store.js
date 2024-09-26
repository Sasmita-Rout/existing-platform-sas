import { create } from "zustand";

const useStore = create((set) => ({
  projects: null,
  loading: false,
  error: null,
  selectedAccount: "",
  setProjects: (projects) => set({ projects }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSelectedAccount: (account) => set({ selectedAccount: account }),
  selectedBUH: "",
  selectedDD: "",
  selectedProject: "",
  setSelectedBUH: (value) => set({ selectedBUH: value }),
  setSelectedDD: (value) => set({ selectedDD: value }),
  setSelectedProject: (value) => set({ selectedProject: value }),
  resetFilters: () =>
    set({
      selectedBUH: "",
      selectedAccount: "",
      selectedDD: "",
      selectedProject: "",
    }),
}));

export default useStore;
