import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const dateFormat = require("dateformat");
const dateString = "mmmm d, yyyy";

interface HomePatientProfileProps {
  title?: string;
  date: number;
  lastModified: number;
  firstName: string;
  lastName: string;
  sex: string;
  age: number;
  dateOfBirth: number;
  isPregnant: string | null;
  ethnicity: string;
  country: string;
}

export const HomePatientProfile: React.FC<HomePatientProfileProps> = ({
  title,
  date,
  lastModified,
  firstName,
  lastName,
  sex,
  age,
  dateOfBirth,
  isPregnant,
  ethnicity,
  country,
}) => {
  const [isShowingInfo, setIsShowingInfo] = useState(false);

  return (
    <>
      <div className="home-patient-profile-container">
        <div className="home-patient-profile-name-col">
          {lastName}, {firstName}
        </div>
        <div className="home-patient-profile-date-col">
          {dateFormat(new Date(date), dateString)}
        </div>
        <div className="home-patient-profile-last-modified-col">
          {dateFormat(new Date(lastModified), dateString)}
        </div>
        <div
          className="home-patient-profile-info-btn"
          onClick={() => setIsShowingInfo(!isShowingInfo)}
        >
          <div className="home-patient-profile-info-icon">
            <FontAwesomeIcon icon="info-circle" />
          </div>
        </div>
      </div>
      {isShowingInfo && (
        <div className="home-patient-profile-info-container">
          <div className="home-patient-profile-info-quick-info-container">
            <h2>Quick Info</h2>
            <p>
              <span className="bold-span">Age:</span> {age}
            </p>
            <p>
              <span className="bold-span">Sex:</span> {sex}
            </p>
            {isPregnant !== null ? (
              <p>
                <span className="bold-span">Pregnant:</span> {isPregnant}
              </p>
            ) : null}
            <p>
              <span className="bold-span">Country:</span> {country}
            </p>
            <p>
              <span className="bold-span">Ethnicity:</span> {ethnicity}
            </p>
            <p>
              <span className="bold-span">Date Of Birth:</span>{" "}
              {dateFormat(new Date(dateOfBirth), dateString)}
            </p>
          </div>
          <div className="home-patient-profile-info-btn-container">
            <div className="home-patient-profile-info-export-btn">
              Export Patient as PDF
            </div>
            <div className="home-patient-profile-info-delete-btn">
              Delete Patient Profile
            </div>
          </div>
        </div>
      )}
    </>
  );
};
