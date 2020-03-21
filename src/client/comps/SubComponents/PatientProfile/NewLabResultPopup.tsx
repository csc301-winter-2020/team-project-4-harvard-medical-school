import React, { useState } from "react";
import { defaultPatientProfile } from "../../../utils/defaultPatientProfile";
import "../../../scss/home/home";
import { toast } from "react-toastify";

interface NewLabResultProps {
  history?: any;
  setShowNewLabResultPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NewLabResultState {
  name: string;
  value: number;
  lower: number;
  upper: number;
  scale: string;
  added: boolean;
}

export const NewLabResultPopup: React.FC<NewLabResultProps> = ({
  history,
  setShowNewLabResultPopup,
}) => {
  const mToast:any = toast;
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const newLabResult = async () => {
    if (name === "" || value === ""){
      mToast.warn("One or more fields are missing!");
      return;
    }
    let data = JSON.parse(JSON.stringify(defaultPatientProfile));
    data["name"] = name;
    data["value"] = value
  };

  return (
    <div
      className="home-page-create-new-patient-popup"
      onClick={(e: any) => {
        if (e.target.className === "home-page-create-new-patient-popup") {
          setShowNewLabResultPopup(false);
        }
      }}
    >
      <div className="home-page-create-new-patient-popup-inner">
        <h1>Add Lab Result</h1>
        <br />

        <div>
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Name"
            maxLength={16}
            value={name}
            onChange={(e: any) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Value"
            maxLength={16}
            value={value}
            onChange={(e: any) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <div className="home-page-create-new-patient-btn-cntr">
          <div
            className="home-page-create-new-patient-popup-btn"
            onClick={newLabResult}
          >
            <p>Add Lab Result</p>
          </div>
          <div
            className="home-page-create-new-patient-popup-btn"
            onClick={(e: any) => {
              setShowNewLabResultPopup(false);
            }}
          >
            <p>Back</p>
          </div>
        </div>
      </div>
    </div>
  );
};
