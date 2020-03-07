import { Template } from "../comps/Pages/TemplatesPage";
export const defaultTemplate: Template = {
  user_id: null,
  template_id: null,
  template_name: "New Template",
  date_millis: new Date().getTime(),
  template: [
    {
      title: "Demographics",
      visible: true,
      fields: [
        {
          name: "firstName",
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
        {
          name: "pregnant",
          value: true,
        },

        {
          name: "country",
          value: true,
        },
      ],
    },
    {
      title: "Chief Complaint & History of Present Illness",
      visible: true,
      fields: [
        {
          name: "chiefComplaint",
          value: true,
        },
        {
          name: "HPI",
          value: true,
        },
      ],
    },
    {
      title: "Past Medical History",
      visible: true,
      fields: [
        {
          name: "pastMedHist",
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
          name: "allergies",
          value: true,
        },
      ],
    },
    {
      title: "Social History",
      visible: true,
      fields: [
        {
          name: "work",
          value: true,
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
          value: true,
        },
        {
          name: "smoker",
          value: true,
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
      title: "Family History",
      visible: true,
      fields: [
        {
          name: "familyHist",
          value: true,
        },
      ],
    },
    {
      title: "Review of Systems",
      visible: true,
      fields: [
        {
          name: "endocrine",
          value: true,
        },
        {
          name: "vision",
          value: true,
        },
        {
          name: "headAndNeck",
          value: true,
        },
        {
          name: "pulmonary",
          value: true,
        },
        {
          name: "cardiovascular",
          value: true,
        },
        {
          name: "gastrointestinal",
          value: true,
        },
        {
          name: "gynaecological",
          value: true,
        },
        {
          name: "hematologic",
          value: true,
        },
        {
          name: "neurological",
          value: true,
        },
        {
          name: "musculoskeletal",
          value: true,
        },
        {
          name: "mental",
          value: true,
        },
        {
          name: "skinAndHair",
          value: true,
        },
      ],
    },
    {
      title: "Physical Examination",
      visible: true,
      fields: [],
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
      title: "Lab Results",
      visible: true,
      fields: [],
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
  ],
};

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
