"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PersonalInfoState, updateFields } from "@/app/features/personalInfo/personalInfoSlice";
import Button from "../ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../ui/InputField";


interface IFormInput {
  firstName: string | number;
  lastName: string | number;
  email: string | number;
  phone: string | number;
}

const PersonalInfoForm = ({ onNext }: { onNext: () => void }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors  },setValue } = useForm<IFormInput>();

  const personalInfo = useSelector (
    (state: { personalInfo: PersonalInfoState }) => state.personalInfo
);
  const { firstName, lastName, phone, email } = personalInfo;
  
    useEffect(() => {
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("phone", phone);
      setValue("email", email);
    }, [setValue, personalInfo]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {

    const personalInfoData: Partial<PersonalInfoState> = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    };
    dispatch(updateFields(personalInfoData));
    onNext();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Personal Information</h2>

      <InputField
        name="firstName"
        label="First Name"
        placeholder="Enter your First Name"
        register={register }
        required="First Name is required"
        error={errors.firstName}
      />

      <InputField
        name="lastName"
        label="Last Name"
        placeholder="Enter your Last Name"
        register={register}
        required="Last Name is required"
        error={errors.lastName}
      />

      <InputField
        name="email"
        label="Email"
        placeholder="Enter your Email"
        register={register}
        required="Email is required"
        error={errors.email}
      />

      <InputField
        name="phone"
        label="Phone"
        placeholder="Enter your Phone"
        register={register}
        required="Phone is required"
        error={errors.phone}
      />

      <Button text="Next" type="submit" />

    </form>
  );
};

export default PersonalInfoForm;
