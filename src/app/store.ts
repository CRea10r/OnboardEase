import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "./features/personalInfo/personalInfoSlice";
import addressInfoReducer from "./features/addressInfo/addressInfoSlice";
import profInfoReducer from "./features/professionalInfo/profInfoSlice";
import eduInfoReducer from "./features/educationInfo/eduInfoSlice";

export const store = configureStore({
    reducer: {
        personalInfo: personalInfoReducer,
        profInfo: profInfoReducer,
        addressInfo: addressInfoReducer,
        educationInfo: eduInfoReducer
    },    
});