import React, { useState } from "react";
import "../../../scss/home/home";
import { toast } from "react-toastify";

interface NewAdminClassProps {
  setNewClassPopup: React.Dispatch<React.SetStateAction<boolean>>;
  refreshClasses: () => void
}

export const NewAdminClass: React.FC<NewAdminClassProps> = ({
  setNewClassPopup,
  refreshClasses
}) => {
  const [newClassName, setNewClassName] = useState("");
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
      <div className="home-page-create-new-patient-popup-inner">
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
        <div className="home-page-create-new-patient-btn-cntr">
          <div
            className="home-page-create-new-patient-popup-btn"
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
