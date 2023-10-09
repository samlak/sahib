import { create } from 'zustand'

const useSidebarStatus = create((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({
    isSidebarOpen: !state.isSidebarOpen 
  })),
}))

export {
  useSidebarStatus,
};