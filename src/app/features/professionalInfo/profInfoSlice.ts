import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProfInfoState {
  [key: string]: string ;
}

const initialState: ProfInfoState = {
  personalUse: "",
  occupation: "",
};

const profInfoSlice = createSlice({
  name: "profInfo",
  initialState,
  reducers: {
    updateFields: (state, action: PayloadAction<Partial<ProfInfoState>>) => {
      Object.entries(action.payload).forEach(([field, value]) => {
        if (field in state) {
          state[field as keyof ProfInfoState] = value as string;
        }
      });
    }
  },
});

export const { updateFields } = profInfoSlice.actions;
export default profInfoSlice.reducer;
