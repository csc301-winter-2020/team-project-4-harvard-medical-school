import React, { useState } from "react";
import "../../../scss/home/home";
import { toast } from "react-toastify";
import { Dropdown } from "semantic-ui-react";
import "../../../scss/semantic";
import { AdminClass } from "../../Pages/Admin/AdminPage";

interface NewAdminClassProps {
  setNewClassPopup: React.Dispatch<React.SetStateAction<boolean>>;
  classes: AdminClass[];
  setClasses: React.Dispatch<React.SetStateAction<AdminClass[]>>;
}

interface Instructor {
  id: number;
  firstName: string;
  lastName: string;
}

const mockData: Instructor[] = [
  { id: 0, firstName: "First", lastName: "Last" },
  { id: 2, firstName: "Steven", lastName: "Kang" },
];

const mockDataOptions = [
  { key: "First Last", value: "First Last", text: "First Last" },
  { key: "Steven Kang", value: "Steven Kang", text: "Steven Kang" },
];

export const NewAdminClass: React.FC<NewAdminClassProps> = ({
  setNewClassPopup,
  classes,
  setClasses,
}) => {
  const [newClassName, setNewClassName] = useState("");
  const [instructors, setInstructors] = useState(mockData);
  const [selectedInstructor, setSelectedInstructor] = useState<string>("");
  const mToast: any = toast;

  const createNewClass = async () => {
    if (newClassName === "") {
      mToast.warn("Missing class name!");
      return;
    }
    if (selectedInstructor === ""){
      mToast.warn("Missing instructor!");
      return;
    }

    let data = {
      name: newClassName,
      instructor_id: (await (await fetch(`/api/me`)).json()).id,
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

    setClasses([
      ...classes,
      {
        name: data.name,
        id: data.instructor_id
      }
    ]);
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
        <div id="dropdown-container">
          <Dropdown
            placeholder="Select Instructor"
            fluid
            search
            selection
            onChange={(
              event: any,
              { key, value }: { key: any; value: any }
            ) => {
              console.log(value);
              setSelectedInstructor(value);
            }}
            options={mockDataOptions}
          />
        </div>
        <br />
        <div className="home-page-create-new-patient-btn-cntr">
          <div
            className={
              selectedInstructor && newClassName
                ? "home-page-create-new-patient-popup-btn"
                : "home-page-create-new-patient-popup-btn-gray"
            }
            onClick={createNewClass}
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
