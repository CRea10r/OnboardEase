"use client";
import React from "react";
import { useSelector } from "react-redux";
import { PersonalInfoState } from "@/app/features/personalInfo/personalInfoSlice";
import { ProfInfoState } from "@/app/features/professionalInfo/profInfoSlice";
import { AddressInfoState } from "@/app/features/addressInfo/addressInfoSlice";
import { EducationInfoState } from "@/app/features/educationInfo/eduInfoSlice";

const DetaileInfo = () => {
  const { firstName, lastName, phone, email } = useSelector(
    (state: { personalInfo: PersonalInfoState }) => state.personalInfo
  );

  const { address, landmark, city, state, pincode } = useSelector(
    (state: { addressInfo: AddressInfoState }) => state.addressInfo
  );

  const { personalUse, occupation } = useSelector(
    (state: { profInfo: ProfInfoState }) => state.profInfo
  );

  const { tenthMarksheet, twelfthMarksheet, tenthPercentage, twelfthPercentage } = useSelector(
    (state: { educationInfo: EducationInfoState }) => state.educationInfo
  );

  const { name: tenthMarksheetName, size: tenthMarksheetSize, type: tenthMarksheetType } = tenthMarksheet || {};
  const { name: twelfthMarksheetName, size: twelfthMarksheetSize, type: twelfthMarksheetType } = twelfthMarksheet || {};

  const handleExport = () => {
    const exportData = {
      personalInfo: {
        firstName,
        lastName,
        phone,
        email,
      },
      addressInfo: {
        address,
        landmark,
        city,
        state,
        pincode,
      },
      professionalInfo: {
        personalUse,
        occupation,
      },
      educationInfo: {
        tenthPercentage,
        twelfthPercentage,
        tenthMarksheet: {
          name: tenthMarksheetName,
          size: tenthMarksheetSize,
          type: tenthMarksheetType,
        },
        twelfthMarksheet: {
          name: twelfthMarksheetName,
          size: twelfthMarksheetSize,
          type: twelfthMarksheetType,
        },
      },
    };

    
    const jsonData = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "formData.json"; 
    a.click()
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      <button
        onClick={handleExport}
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition-all"
      >Export
      </button>

      <h2 className="text-3xl font-semibold text-center mb-6">Detailed Information</h2>
      <div className="grid grid-cols-1 gap-6">

        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium mb-4">Personal Information</h3>
          <div className="space-y-2">
            <p className="text-gray-700"><strong>First Name:</strong> {firstName}</p>
            <p className="text-gray-700"><strong>Last Name:</strong> {lastName}</p>
            <p className="text-gray-700"><strong>Phone Number:</strong> {phone}</p>
            <p className="text-gray-700"><strong>Email:</strong> {email}</p>
          </div>
        </div>


        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium mb-4">Address Information</h3>
          <div className="space-y-2">
            <p className="text-gray-700"><strong>Address:</strong> {address}</p>
            <p className="text-gray-700"><strong>Landmark:</strong> {landmark}</p>
            <p className="text-gray-700"><strong>City:</strong> {city}</p>
            <p className="text-gray-700"><strong>State:</strong> {state}</p>
            <p className="text-gray-700"><strong>Pincode:</strong> {pincode}</p>
          </div>
        </div>


        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium mb-4">Professional Information</h3>
          <div className="space-y-2">
            <p className="text-gray-700"><strong>What are you using this for?:</strong> {personalUse}</p>
            <p className="text-gray-700"><strong>Occupation:</strong> {occupation}</p>
          </div>
        </div>


        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-medium mb-4">Education Information</h3>
          <div className="space-y-2">
            <p className="text-gray-700"><strong>10th Percentage:</strong> {tenthPercentage}</p>
            {tenthMarksheet ? (
              <div>
                <p className="text-gray-700"><strong>10th Marksheet Name:</strong> {tenthMarksheetName}</p>
                <p className="text-gray-700"><strong>10th Marksheet Size:</strong> {tenthMarksheetSize}</p>
                <p className="text-gray-700"><strong>10th Marksheet Type:</strong> {tenthMarksheetType}</p>
              </div>
            ) : (
              <p className="text-gray-700">No 10th Marksheet uploaded.</p>
            )}
            
            <p className="text-gray-700"><strong>12th Percentage:</strong> {twelfthPercentage}</p>
            {twelfthMarksheet ? (
              <div>
                <p className="text-gray-700"><strong>12th Marksheet Name:</strong> {twelfthMarksheetName}</p>
                <p className="text-gray-700"><strong>12th Marksheet Size:</strong> {twelfthMarksheetSize}</p>
                <p className="text-gray-700"><strong>12th Marksheet Type:</strong> {twelfthMarksheetType}</p>
              </div>
            ) : (
              <p className="text-gray-700">No 12th Marksheet uploaded.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetaileInfo;
