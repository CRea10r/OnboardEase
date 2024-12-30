"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProfInfoState, updateFields } from "@/app/features/professionalInfo/profInfoSlice";
import Button from "../ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../ui/InputField";

interface IFormInput {
  personalUse: string;
  occupation: string;
}
interface ProfInfoFormProps {
  onNext: () => void;
  onBack: () => void;
}

const ProfessionalInfoForm: React.FC<ProfInfoFormProps> = ({ onNext, onBack }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInput>();

  const profInfo = useSelector((state: { profInfo: ProfInfoState }) => state.profInfo);

  const { personalUse, occupation } = profInfo;

  useEffect(() => {
   setValue("personalUse", personalUse);
   setValue("occupation", occupation);
  }, [setValue, personalUse, occupation]);
  

  const handlePrev = (): void => {
    onBack();
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const profInfoData: Partial<ProfInfoState> = {
      personalUse: data.personalUse,
      occupation: data.occupation,
    };
    dispatch(updateFields(profInfoData));
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Professional Information</h2>

      <InputField
        name="personalUse"
        label="What are you using this for?"
        type="select"
        register={register}
        required="This field is required"
        error={errors.personalUse}
        options={[
          { value: "personal", label: "Personal Use" },
          { value: "industry", label: "Industry" },
          { value: "other", label: "Other" },
        ]}
      />

      <InputField
        name="occupation"
        label="Who are you?"
        type="radio"
        register={register}
        required="This field is required"
        error={errors.occupation}
        options={[
          { value: "student", label: "Student" },
          { value: "employee", label: "Employee" },
          { value: "other", label: "Other" },
        ]}
      />

      <div className="flex flex-col gap-2">
        <Button text="Back" onClick={handlePrev} />
        <Button text="Next" type="submit" />
      </div>
    </form>
  );
};

export default ProfessionalInfoForm;
