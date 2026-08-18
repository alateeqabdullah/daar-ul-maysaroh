// app/(marketing)/onsite/admissions/types.ts

export type FormData = {
  // Section 1: Programme Selection
  programmeType: string;
  programmeOfStudy: string[];
  enrolmentPeriod: string;
  resumptionDate: string;
  weekendDays: string[];

  // Section 2: Student Information
  studentFullName: string;
  preferredName: string;
  gender: string;
  dateOfBirth: string;
  age: string;
  nationality: string;
  countryOfResidence: string;
  stateOfOrigin: string;
  residentialAddress: string;
  livedAwayFromHome: string;
  livedAwayFromHomeDetails: string;
  boardedBefore: string;
  previousMadrasah: string;
  previousMadrasahLocation: string;
  previousMadrasahDuration: string;
  previousMadrasahReason: string;

  // Section 3: Parent/Guardian Information
  fatherName: string;
  motherName: string;
  guardianName: string;
  guardianRelationship: string;
  guardianPhone: string;
  guardianWhatsApp: string;
  guardianEmail: string;
  guardianCountry: string;
  guardianAddress: string;
  preferredCommunication: string;
  hasEmergencyContact: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  emergencyContactWhatsApp: string;

  // Section 4: Qur'an Background
  startedQuran: string;
  quranReadingLevel: string;
  studiedNoorAlBayan: string;
  noorAlBayanMethod: string;
  startedMemorization: string;
  memorizationAmount: string;
  currentMemorizing: string;
  memorizationFrequency: string;
  memorizationAmountDescription: string;
  memorizationStrength: string;
  murajaahFrequency: string;
  hasMurajaahRoutine: string;
  murajaahRoutineDescription: string;
  studiedTajweed: string;
  tajweedLevel: string;
  studiedQiraat: string;
  qiraatDetails: string;
  currentTeacher: string;
  teacherName: string;
  parentQuranGoals: string[];
  quranJourneyNotes: string;

  // Section 5: Islamic Education
  studiedIslamicStudies: string;
  islamicStudiesAreas: string[];
  islamicKnowledgeLevel: string;
  studiedArabic: string;
  arabicLevel: string;
  islamicEducationGoals: string;

  // Section 6: Learning Profile
  motivation: string;
  desiredAchievement: string;
  enjoysMemorization: string;
  responseToCorrection: string;
  concentrationDifficulty: string;
  learningDifficulties: string;
  learningDifficultiesDetails: string;
  greatestStrength: string;
  needsImprovement: string;

  // Section 7: Boarding & Tarbiyah
  whyBoarding: string;
  livedAwayFromParents: string;
  awayFromHomeResponse: string;
  routineDifficulty: string;
  wakesForSalah: string;
  generalDiscipline: string;
  behavioralConcerns: string;
  personalityNotes: string;
  tarbiyahGoals: string;

  // Section 8: Health & Welfare
  medicalCondition: string;
  medicalConditionDetails: string;
  allergies: string;
  allergiesDetails: string;
  medication: string;
  medicationDetails: string;
  dietaryRestrictions: string;
  dietaryRestrictionsDetails: string;
  seriousMedicalHistory: string;
  specialNeeds: string;
  specialNeedsDetails: string;
  healthNotes: string;

  // Section 9: Communication
  updatePreference: string;
  updateFrequency: string;
  comfortableContact: string;
  communicationNotes: string;

  // Section 10: Visitation
  authorisedVisitors: string;
  authorisedCollectors: string;
  restrictedPersons: string;
  restrictedPersonsDetails: string;

  // Section 11: Declaration
  parentFullName: string;
  declarationDate: string;
  agreeDeclaration: boolean;
};

export type Section = {
  id: string;
  title: string;
  icon: React.ElementType;
};

export type FormErrors = {
  [key in keyof FormData]?: string;
};

export interface SectionProps {
  formData: FormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleArrayChange?: (name: string, value: string) => void;
  errors?: FormErrors;
  touched?: { [key: string]: boolean };
}
