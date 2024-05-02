import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const initialState = {
  user: {},
  credentials: {},
  book: {},
  appointment: {},
  _hasHydrated: false,
}
const useUserStore = create()(
  persist(
    (set) => ({
      ...initialState,
      setState: (keys) => set((state) => ({ ...state, ...keys })),
      reset: () => set(initialState)
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      onRehydrateStorage: () => () => {
        useUserStore.setState({ _hasHydrated: true });
      },
      migrate: (persistedState, version) => {
        if (version === 0) {
          persistedState.newField = persistedState.oldField;
          delete persistedState.oldField;
        }
        return persistedState;
      },
    }
  ),
)

export default useUserStore