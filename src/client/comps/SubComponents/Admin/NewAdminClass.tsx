import React, { useState, useEffect } from "react";
import "../../../scss/home/home";
import { toast } from "react-toastify";
import { Dropdown } from 'semantic-ui-react';

interface NewAdminClassProps {
  setNewClassPopup: React.Dispatch<React.SetStateAction<boolean>>;
  refreshClasses: () => void
}

interface InstructorOptions {
  id: number;
  firstName: string;
  lastName: string;
  key: string; 
  value: string;
  text: string; 
}

function setSelectedTemplate(stuff: any) {
  console.log('>>>', stuff);
}

export const NewAdminClass: React.FC<NewAdminClassProps> = ({
  setNewClassPopup,
  refreshClasses
}) => {
  const [newClassName, setNewClassName] = useState("");
  const [instructors, setInstructors] = useState<InstructorOptions[]>([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState(null);
  const mToast: any = toast;

  const createNewClass = async () => {
    if (newClassName === "") {
      mToast.warn("Missing class name!");
      return;
    }

    let data = {
      name: newClassName,
      instructor_id: selectedInstructorId
    };
    console.log(data)
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

  useEffect(() => {
    fetch(`/api/instructors/all`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `Error code: ${response.status}, ${response.statusText}`
          );
        }
      })
      .then((data: any) => {
        const allInstructors: InstructorOptions[] = [];
        data.forEach((row: any) => {
          allInstructors.push({
            firstName: row.first_name,
            lastName: row.last_name,
            id: row.id,
            key: row.id,
            value: row.id,
            text: row.first_name + " " + row.last_name
          });
        });
        setInstructors(allInstructors);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

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
              setSelectedInstructorId(value);
            }}
            options={instructors}
          />
        </div>
        <br />
        <div className="home-page-create-new-patient-btn-cntr">
          <div
            className={selectedInstructorId && newClassName ?
              "home-page-create-new-patient-popup-btn" :
              "home-page-create-new-patient-popup-btn-gray"
            }
            onClick={selectedInstructorId && newClassName ?
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
