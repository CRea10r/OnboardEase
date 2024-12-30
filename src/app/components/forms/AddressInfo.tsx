"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddressInfoState, updateFields } from "@/app/features/addressInfo/addressInfoSlice";
import Button from "../ui/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import InputField from "../ui/InputField";

interface AddressInfoFromProps {
  onNext: () => void;
  onBack: () => void;
}

interface IFormInput {
  address: string | number;
  landmark: string | number;
  city: string | number;
  state: string | number;
  pincode: string | number;
}

const AddressForm: React.FC<AddressInfoFromProps> = ({ onNext, onBack }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormInput>();

  const addressInfo = useSelector((state: { addressInfo: AddressInfoState }) => state.addressInfo);

  const { address, landmark, city, state, pincode } = addressInfo;

  useEffect(() => {
    setValue("address", address);
    setValue("landmark", landmark);
    setValue("city", city);
    setValue("state", state);
    setValue("pincode", pincode);
  }, [setValue, addressInfo]);

  const handlePrev = (): void => {
    onBack();
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const addressData: Partial<AddressInfoState> = {
      address: data.address,
      landmark: data.landmark,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
    };

    dispatch(updateFields(addressData));
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Address Information</h2>

      <InputField
        name="address"
        label="Address"
        placeholder="Enter Address"
        register={register}
        required="Address is required"
        error={errors.address}
      />

      <InputField
        name="landmark"
        label="Landmark"
        placeholder="Enter Landmark"
        required="Landmark is required"
        register={register}
        error={errors.landmark}
      />

      <InputField
        name="city"
        label="City"
        placeholder="Enter City"
        register={register}
        required="City is required"
        error={errors.city}
      />

      <InputField
        name="state"
        label="State"
        placeholder="Enter State"
        register={register}
        required="State is required"
        error={errors.state}
      />

      <InputField
        name="pincode"
        label="Pincode"
        type="number"
        placeholder="Enter your Pincode"
        register={register}
        required="Pincode is required"
        error={errors.pincode}
      />

      <div className="flex flex-col gap-2">
        <Button text="Back" onClick={handlePrev} />
        <Button text="Next" type="submit" />
      </div>
    </form>
  );
};

export default AddressForm;
