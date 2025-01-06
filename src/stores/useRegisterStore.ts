/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface RegisterState {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  data: any;
  setData: (data: any) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  step: 1,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  data: {},
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
}));
