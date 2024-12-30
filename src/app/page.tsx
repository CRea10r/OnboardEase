"use client";
import AddressForm from "./components/forms/AddressInfo";
import PersonalInfoForm from "./components/forms/PersonalInfo";
import ProfessionalInfoForm from "./components/forms/ProfessionalInfo";
import EducationInfoForm from "./components/forms/EducationInfo";
import DetailedInfo from "./components/forms/DetailedInfo";
import { useState } from "react";


export default function Home() {
  const [currentStep, setCurrentStep] = useState(1) 

  const goToNextStep = (): void => {
    setCurrentStep(prevStep => prevStep + 1)
  }

  const goToPreviousStep = (): void => {
    setCurrentStep(prevStep => prevStep - 1)
  }

  return (
    <>
      {currentStep === 1 && <PersonalInfoForm onNext={goToNextStep} />}
      {currentStep === 2 && <AddressForm onNext={goToNextStep} onBack={goToPreviousStep}/>}
      {currentStep === 3 && <ProfessionalInfoForm onNext={goToNextStep} onBack={goToPreviousStep}/>}
      {currentStep === 4 && <EducationInfoForm onNext={goToNextStep} onBack={goToPreviousStep} />}
      {currentStep === 5 && <DetailedInfo/>}

    </>
  );
}
