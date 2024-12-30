import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MarksheetMetadata {
  name: string;
  size: number;
  type: string;
}

export interface EducationInfoState {
  tenthPercentage: string | null;
  twelfthPercentage: string | null;
  tenthMarksheet: MarksheetMetadata | null;
  twelfthMarksheet: MarksheetMetadata | null;
}

const initialState: EducationInfoState = {
  tenthPercentage: null,
  twelfthPercentage: null,
  tenthMarksheet: null,
  twelfthMarksheet: null,
};


const eduInfoSlice = createSlice({
  name: 'educationInfo',
  initialState,
  reducers: {
    updateFields: (state, action: PayloadAction<Partial<EducationInfoState>>) => {
      Object.entries(action.payload).forEach(([field, value]) => {
        if (field in state) {
          const key = field as keyof EducationInfoState;
    
          if (key === "tenthMarksheet" || key === "twelfthMarksheet") {
            if (value === null || typeof value === "object") {
              state[key] = value as MarksheetMetadata | null;
            }
          } else {
            state[key] = value as string | null;
          }
        }
      });
    },
  },
});

export const { updateFields } = eduInfoSlice.actions;

export default eduInfoSlice.reducer;
