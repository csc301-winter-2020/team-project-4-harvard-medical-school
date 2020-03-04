import React from "react";
import { Template, TemplatePage } from "../../Pages/TemplatesPage";
import { dateFormatFull } from "../../../utils/utils";
import Popup from "reactjs-popup";
import { Questions } from "./Questions";
import { useHistory } from "react-router";

interface TemplateRowProps {
  name: string;
  date: number;
  templatePages: TemplatePage[];
  id: number;
}

export const TemplateRow: React.FC<TemplateRowProps> = ({
  name,
  date,
  templatePages,
  id
}) => {
  const history = useHistory();
  return (
    <>
      <div className="home-patient-profile-container" onClick={() => {
        history.push(`/template/${id}`);
      }}>
        <div className="home-patient-profile-name-col">{name}</div>
        <div className="home-patient-profile-date-col"> </div>
        <div className="home-patient-profile-last-modified-col">
          {dateFormatFull(date)}
        </div>
        <div className="home-patient-profile-info-btn">
          <div className="home-patient-profile-info-icon"></div>
        </div>
      </div>
    </>
  );
};
