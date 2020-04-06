/**
 * This popup lets a student create a new patient profile.
 */

import React, { useState } from "react";
import { defaultPatientProfile } from "../../../utils/defaultPatientProfile";
import "../../../scss/home/home";
import { toast } from "react-toastify";
import { MyToast } from "../../../utils/types";
import { Template } from "../../Pages/TemplatesPage";
import { Dropdown } from "semantic-ui-react";

interface NewPatientProps {
  history?: any;
  setShowNewPatientPopup: React.Dispatch<React.SetStateAction<boolean>>;
  templates: Template[];
  user: any;
  classID: number;
}

export const NewPatient: React.FC<NewPatientProps> = ({
  history,
  setShowNewPatientPopup,
  classID,
  templates,
  user,
}) => {
  const mToast:MyToast = toast as any;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const newPatient = async () => {
    if (firstName === "" || lastName === ""){
      mToast.warn("One or more fields are missing!");
      return;
    }
    let data = JSON.parse(JSON.stringify(defaultPatientProfile));
    data["first_name"] = firstName;
    data["family_name"] = lastName;
    data["class_id"] = classID;
    data["student_id"] = user.id;
    data["template_id"] = selectedTemplate;
    data["patient_id"] = undefined;
    console.log(data);
    const res = await fetch(`/api/patientprofile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const id = await res.json();
    console.log(id);
    history.push(`/patient/${id["id"]}/demographics`);
  };

  return (
    <div
      className="home-page-create-new-patient-popup"
      onClick={(e: any) => {
        if (e.target.className === "home-page-create-new-patient-popup") {
          setShowNewPatientPopup(false);
        }
      }}
    >
      <div className="home-page-create-new-patient-popup-inner">
        <h1>Create Patient Profile</h1>
        <br />

        <div>
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="First Name"
            maxLength={16}
            value={firstName}
            onChange={(e: any) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Last Name"
            maxLength={16}
            value={lastName}
            onChange={(e: any) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div id="dropdown-container">
          <Dropdown
            placeholder="Select Template"
            fluid
            search
            selection
            onChange={(event: any, { value }: {value: any}) => {
              setSelectedTemplate(value);
            }}
            options={templates}
          />
        </div>
        <div className="home-page-create-new-patient-btn-cntr">
          <div
            className="home-page-create-new-patient-popup-btn"
            onClick={newPatient}
          >
            <p>Create</p>
          </div>
          <div
            className="home-page-create-new-patient-popup-btn"
            onClick={(e: any) => {
              setShowNewPatientPopup(false);
            }}
          >
            <p>Back</p>
          </div>
        </div>
      </div>
    </div>
  );
};
