import { create } from 'zustand'

const initialState = {
  loading: false,
  selectedDoctor: {}
}
const useAppStore = create()((set) => ({
      ...initialState,
      setState: (keys) => set((state) => ({ ...state, ...keys })),
      reset: () => set(initialState)
    })
)

export default useAppStore