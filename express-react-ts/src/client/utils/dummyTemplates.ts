import { Template } from "../comps/Pages/TemplatesPage";

export const dummyTemplates: Template[] = [
  {
    user_id: 1,
    template_id: 0,
    template_name: "MyNewTemplate",
    date_millis: 123123123123123,
    template: [
      {
        title: "Social History",
        visible: true,
        fields: [
          {
            name: "work",
            value: false,
          },
          {
            name: "livingConditions",
            value: true,
          },
          {
            name: "sexualHistory",
            value: true,
          },
          {
            name: "etOH",
            value: true,
          },
          {
            name: "drinksPerWeek",
            value: false,
          },
          {
            name: "smoker",
            value: false,
          },
          {
            name: "lastTimeSmoked",
            value: true,
          },
          {
            name: "packsPerDay",
            value: true,
          },
          {
            name: "otherSubstances",
            value: true,
          },
        ],
      },
      {
        title: "Demographics",
        visible: true,
        fields: [
          {
            name: "country",
            value: true,
          },
          {
            name: "firstName",
            value: true,
          },
          {
            name: "pregnant",
            value: true,
          },
          {
            name: "lastName",
            value: true,
          },
          {
            name: "sex",
            value: true,
          },
        ],
      },
      {
        title: "Family History",
        visible: false,
        fields: [
          {
            name: "familyHist",
            value: true,
          },
        ],
      },
      {
        title: "Past Medical History",
        visible: true,
        fields: [
          {
            name: "allergies",
            value: true,
          },
          {
            name: "pastHospits",
            value: true,
          },
          {
            name: "medications",
            value: true,
          },
          {
            name: "pastMedHist",
            value: true,
          },
        ],
      },
      {
        title: "Imaging Results",
        visible: true,
        fields: [
          {
            name: "imagingResults",
            value: true,
          },
        ],
      },
      {
        title: "Assessment & Plan",
        visible: true,
        fields: [
          {
            name: "assessment",
            value: true,
          },
        ],
      },
      {
        title: "Chief Complaint & History of Present Illness",
        visible: true,
        fields: [
          {
            name: "HPI",
            value: true,
          },
          {
            name: "chiefComplaint",
            value: true,
          },
        ],
      },
      {
        title: "Lab Results",
        visible: false,
        fields: [],
      },
      {
        title: "Physical Examination",
        visible: false,
        fields: [],
      },
      {
        title: "Review of Systems",
        visible: false,
        fields: [
          {
            name: "endocrine",
            value: true,
          },
          {
            name: "vision",
            value: false,
          },
        ],
      },
    ],
  },

  {
    user_id: 1,
    template_id: 1,
    template_name: "The second template",
    date_millis: 456789456789,
    template: [
      {
        title: "Social History",
        visible: true,
        fields: [
          {
            name: "work",
            value: false,
          },
          {
            name: "livingConditions",
            value: true,
          },
          {
            name: "sexualHistory",
            value: true,
          },
          {
            name: "etOH",
            value: true,
          },
          {
            name: "drinksPerWeek",
            value: false,
          },
          {
            name: "smoker",
            value: false,
          },
          {
            name: "lastTimeSmoked",
            value: true,
          },
          {
            name: "packsPerDay",
            value: true,
          },
          {
            name: "otherSubstances",
            value: true,
          },
        ],
      },
      {
        title: "Demographics",
        visible: true,
        fields: [
          {
            name: "country",
            value: true,
          },
          {
            name: "firstName",
            value: true,
          },
          {
            name: "pregnant",
            value: true,
          },
          {
            name: "lastName",
            value: true,
          },
          {
            name: "sex",
            value: true,
          },
        ],
      },
      {
        title: "Family History",
        visible: false,
        fields: [
          {
            name: "familyHist",
            value: true,
          },
        ],
      },
      {
        title: "Past Medical History",
        visible: true,
        fields: [
          {
            name: "allergies",
            value: true,
          },
          {
            name: "pastHospits",
            value: true,
          },
          {
            name: "medications",
            value: true,
          },
          {
            name: "pastMedHist",
            value: true,
          },
        ],
      },
      {
        title: "Imaging Results",
        visible: true,
        fields: [
          {
            name: "imagingResults",
            value: true,
          },
        ],
      },
      {
        title: "Assessment & Plan",
        visible: true,
        fields: [
          {
            name: "assessment",
            value: true,
          },
        ],
      },
      {
        title: "Chief Complaint & History of Present Illness",
        visible: true,
        fields: [
          {
            name: "HPI",
            value: true,
          },
          {
            name: "chiefComplaint",
            value: true,
          },
        ],
      },
      {
        title: "Lab Results",
        visible: false,
        fields: [],
      },
      {
        title: "Physical Examination",
        visible: false,
        fields: [],
      },
      {
        title: "Review of Systems",
        visible: false,
        fields: [
          {
            name: "endocrine",
            value: true,
          },
          {
            name: "vision",
            value: false,
          },
        ],
      },
    ],
  },
];
