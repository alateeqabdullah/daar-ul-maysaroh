// app/(marketing)/onsite/admissions/utils/formValidation.ts
import { FormData, FormErrors } from "../types";

export const validateSection = (
  section: number,
  formData: FormData,
): FormErrors => {
  const errors: FormErrors = {};

  switch (section) {
    case 0: // Programme Selection
      if (!formData.programmeType)
        errors.programmeType = "Programme type is required";
      if (formData.programmeOfStudy.length === 0) {
        errors.programmeOfStudy = "Select at least one programme of study";
      }
      if (!formData.enrolmentPeriod)
        errors.enrolmentPeriod = "Enrolment period is required";
      if (!formData.resumptionDate)
        errors.resumptionDate = "Resumption date is required";
      break;

    case 1: // Student Information
      if (!formData.studentFullName)
        errors.studentFullName = "Student's full name is required";
      if (!formData.gender) errors.gender = "Gender is required";
      if (!formData.age) errors.age = "Age is required";
      else if (Number(formData.age) < 5) errors.age = "Age must be at least 5";
      else if (Number(formData.age) > 65)
        errors.age = "Age must be less than 65";
      if (!formData.countryOfResidence)
        errors.countryOfResidence = "Country of residence is required";
      break;

    case 2: // Parent/Guardian
      if (!formData.guardianName)
        errors.guardianName = "Guardian name is required";
      if (!formData.guardianRelationship)
        errors.guardianRelationship = "Relationship is required";
      if (!formData.guardianPhone)
        errors.guardianPhone = "Phone number is required";
      if (!formData.guardianEmail) errors.guardianEmail = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.guardianEmail)) {
        errors.guardianEmail = "Invalid email format";
      }
      if (!formData.guardianCountry)
        errors.guardianCountry = "Country of residence is required";
      if (!formData.preferredCommunication) {
        errors.preferredCommunication =
          "Preferred communication method is required";
      }
      if (formData.hasEmergencyContact === "Yes") {
        if (!formData.emergencyContactName) {
          errors.emergencyContactName = "Emergency contact name is required";
        }
        if (!formData.emergencyContactPhone) {
          errors.emergencyContactPhone = "Emergency contact phone is required";
        }
      }
      break;

    case 3: // Qur'an Background
      if (!formData.startedQuran)
        errors.startedQuran = "Please indicate if student has started reading";
      if (!formData.quranReadingLevel)
        errors.quranReadingLevel = "Quran reading level is required";
      if (!formData.startedMemorization)
        errors.startedMemorization =
          "Please indicate if student has started memorization";
      if (!formData.memorizationFrequency)
        errors.memorizationFrequency = "Memorization frequency is required";
      if (!formData.murajaahFrequency)
        errors.murajaahFrequency = "Muraja'ah frequency is required";
      break;

    case 4: // Islamic Education
      if (!formData.studiedIslamicStudies) {
        errors.studiedIslamicStudies =
          "Please indicate if student has studied Islamic Studies";
      }
      if (!formData.islamicKnowledgeLevel) {
        errors.islamicKnowledgeLevel = "Islamic knowledge level is required";
      }
      if (!formData.studiedArabic) {
        errors.studiedArabic = "Please indicate if student has studied Arabic";
      }
      break;

    case 10: // Declaration
      if (!formData.parentFullName)
        errors.parentFullName = "Parent/Guardian full name is required";
      if (!formData.declarationDate)
        errors.declarationDate = "Date is required";
      if (!formData.agreeDeclaration)
        errors.agreeDeclaration = "You must agree to the declaration";
      break;
  }

  return errors;
};

export const isSectionValid = (
  section: number,
  formData: FormData,
): boolean => {
  const errors = validateSection(section, formData);
  return Object.keys(errors).length === 0;
};
