"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EducationInfoState, updateFields } from "@/app/features/educationInfo/eduInfoSlice";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  tenthPercentage: string;
  twelfthPercentage: string;
  tenthMarksheet: FileList | null;
  twelfthMarksheet: FileList | null;
}

interface EduInfoFormProps {
  onNext: () => void;
  onBack: () => void;
}

const EducationInfoForm: React.FC<EduInfoFormProps> = ({ onNext, onBack }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInput>();

 const educationInfo = useSelector((state: { educationInfo: EducationInfoState }) => state.educationInfo);
  
  const { tenthPercentage, twelfthPercentage, tenthMarksheet, twelfthMarksheet } = educationInfo;

  useEffect(() => {
    setValue("tenthPercentage", tenthPercentage || "");
    setValue("twelfthPercentage", twelfthPercentage || "");
  }, [setValue, educationInfo]);


  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const tenthMarksheet = data.tenthMarksheet ? data.tenthMarksheet[0] : null;
    const twelfthMarksheet = data.twelfthMarksheet ? data.twelfthMarksheet[0] : null;

    const tenthMarksheetMetadata = tenthMarksheet
      ? {
        name: tenthMarksheet.name,
        size: tenthMarksheet.size,
        type: tenthMarksheet.type,
      }
      : null;

    const twelfthMarksheetMetadata = twelfthMarksheet
      ? {
        name: twelfthMarksheet.name,
        size: twelfthMarksheet.size,
        type: twelfthMarksheet.type,
      }
      : null;

    const eduInfoData: Partial<EducationInfoState> = {
      tenthPercentage: data.tenthPercentage,
      twelfthPercentage: data.twelfthPercentage,
      tenthMarksheet: tenthMarksheetMetadata,
      twelfthMarksheet: twelfthMarksheetMetadata,
    };

    dispatch(updateFields(eduInfoData));
    onNext();
  };

  const handlePrev = (): void => {
    onBack();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Education Information</h2>

      <InputField
        type="number"
        name="tenthPercentage"
        label="Tenth Percentage"
        step="0.01"
        placeholder="Enter your 10th Percentage"
        register={register}
        required="10th Percentage is required"
        error={errors.tenthPercentage}
      />

      <InputField
        type="number"
        name="twelfthPercentage"
        label="Twelfth Percentage"
        step="0.01"
        placeholder="Enter your 12th Percentage"
        register={register}
        required="12th Percentage is required"
        error={errors.twelfthPercentage}
      />

      <InputField
        type="file"
        name="tenthMarksheet"
        label="Tenth Marksheet (JPEG only)"
        accept="image/jpeg"
        register={register}
        required="10th Marksheet is required"
        error={errors.tenthMarksheet}
      />

      <InputField
        type="file"
        name="twelfthMarksheet"
        label="Twelfth Marksheet (JPEG only)"
        accept="image/jpeg"
        register={register}
        required="12th Marksheet is required"
        error={errors.twelfthMarksheet}
      />

      <div className="flex flex-col gap-2 mt-4">
        <Button text="Back" onClick={handlePrev} />
        <Button text="Next" type="submit" />
      </div>
    </form>
  );
};

export default EducationInfoForm;
