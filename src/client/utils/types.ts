export type contentType =
  | "Demographics"
  | "Chief Complaint & History of Present Illness"
  | "Past Medical History"
  | "Social History"
  | "Family History"
  | "Review of Systems"
  | "Physical Examination"
  | "Imaging Results"
  | "Lab Results"
  | "Assessment & Plan";

export const contents: contentType[] = [
  "Demographics",
  "Chief Complaint & History of Present Illness",
  "Past Medical History",
  "Social History",
  "Family History",
  "Review of Systems",
  "Physical Examination",
  "Imaging Results",
  "Lab Results",
  "Assessment & Plan",
];

export const fullTemplate: {[key in contentType]: string[]} ={
  "Demographics": ['firstName', 'lastName', 'sex', 'pregnant', 'country'],
  "Assessment & Plan": ["assessment"],
  "Chief Complaint & History of Present Illness": ["chiefComplaint", "HPI"],
  "Family History": ["familyHist"],
  "Imaging Results": ["imagingResults"],
  "Lab Results": [],
  "Past Medical History": ["pastMedHist", "pastHospits", "medications", "allergies"],
  "Physical Examination": [],
  "Review of Systems": ["endocrine", "vision"],
  "Social History": ["work", "livingConditions", "sexualHistory", "etOH", "drinksPerWeek", "smoker", "lastTimeSmoked", "packsPerDay", "otherSubstances"],
}

export type Class = {
  id: number;
  help_enabled: boolean;
  name: string;
  instructor_id: number;
}

export type MyToast = {
  warn: ToastFunc;
  success: ToastFunc;
  info: ToastFunc;
  error: ToastFunc;
}

type ToastFunc = (msg: string, params?: object) => void;