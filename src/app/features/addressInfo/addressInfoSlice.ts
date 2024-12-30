import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AddressInfoState {
  [key: string]: string | number;
}

const initialState: AddressInfoState = {
  address: "",
  landmark: "",
  city: "",
  state: "",
  pincode: "",
};

const addressInfoSlice = createSlice({
  name: "addressInfo",
  initialState,
  reducers: {
    updateFields: (state, action: PayloadAction<Partial<AddressInfoState>>) => {
      Object.entries(action.payload).forEach(([field, value]) => {
        if (field in state) {
          state[field as keyof AddressInfoState] = value as string | number;
        }
      });
    },
  },
});

export const { updateFields } = addressInfoSlice.actions;
export default addressInfoSlice.reducer;
