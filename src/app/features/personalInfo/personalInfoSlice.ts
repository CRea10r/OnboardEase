import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface PersonalInfoState {
  [key: string]: string | number;
}

const initialState: PersonalInfoState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
};

const infoSlice = createSlice({
  name: "personalInfo",
  initialState,
  reducers: {
    updateFields: (state, action: PayloadAction<Partial<PersonalInfoState>>) => {
      Object.entries(action.payload).forEach(([field, value]) => {
        if (field in state) {
          state[field as keyof PersonalInfoState] = value as string | number;
        }
      });
    }
  },
});

export const { updateFields } = infoSlice.actions;

export default infoSlice.reducer;
