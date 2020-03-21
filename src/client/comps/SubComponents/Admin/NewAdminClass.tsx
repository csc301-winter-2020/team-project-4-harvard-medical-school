import React, { useState } from "react";
import "../../../scss/home/home";
import { toast } from "react-toastify";
import { Dropdown } from 'semantic-ui-react';

interface NewAdminClassProps {
  setNewClassPopup: React.Dispatch<React.SetStateAction<boolean>>;
  refreshClasses: () => void
}

interface Instructor {
  id: number;
  firstName: string;
  lastName: string;
}

const mockData: Instructor[] = [
  { id: 0, firstName: 'First', lastName: 'Last' },
  { id: 2, firstName: 'Steven', lastName: 'Kang' },
];

const mockDataOptions = [
  { key: 'First Last', value: 'First Last', text: 'First Last' },
  { key: 'Steven Kang', value: 'Steven Kang', text: 'Steven Kang' },
];

function setSelectedTemplate(stuff: any) {
  console.log('>>>', stuff);
}

export const NewAdminClass: React.FC<NewAdminClassProps> = ({
  setNewClassPopup,
  refreshClasses
}) => {
  const [newClassName, setNewClassName] = useState("");
  const [instructors, setInstructors] = useState(mockData);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const mToast: any = toast;

  const createNewClass = async () => {
    if (newClassName === "") {
      mToast.warn("Missing class name!");
      return;
    }

    let data = {
      name: newClassName,
      instructor_id: (await (await fetch(`/api/me`)).json()).id
    };

    const res = await fetch(`/api/classes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      console.log("Created new class:", newClassName);
    } else {
      console.log("Error trying to create new class:", newClassName);
    }

    refreshClasses();
    setNewClassPopup(false);
  };

  return (
    <div
      className="home-page-create-new-patient-popup"
      onClick={(e: any) => {
        if (e.target.className === "home-page-create-new-patient-popup") {
          setNewClassPopup(false);
        }
      }}
    >
      <div className="home-page-create-new-patient-popup-inner-large">
        <h1>Create New Class</h1>
        <br />

        <div>
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Class Name"
            maxLength={16}
            value={newClassName}
            onChange={(e: any) => {
              setNewClassName(e.target.value);
            }}
          />
        </div>
        <div>
          {
            <link
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
            />
          }
          <br />
          <Dropdown
            placeholder='Select Instructor'
            fluid
            search
            selection
            onChange={(event: any, { value }: {value: any}) => {
              setSelectedInstructor(value);
            }}
            options={mockDataOptions}
          />
        </div>
        <br />
        <div className="home-page-create-new-patient-btn-cntr">
          <div
            className={selectedInstructor && newClassName ?
              "home-page-create-new-patient-popup-btn" :
              "home-page-create-new-patient-popup-btn-gray"
            }
            onClick={selectedInstructor && newClassName ?
              createNewClass :
              () => {}
            }
          >
            <p>Create</p>
          </div>
          <div
            className="home-page-create-new-patient-popup-btn"
            onClick={() => {
              setNewClassPopup(false);
            }}
          >
            <p>Back</p>
          </div>
        </div>
      </div>
    </div>
  );
};
