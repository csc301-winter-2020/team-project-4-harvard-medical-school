import React, { useEffect, useState } from "react";
import { Template, TemplatePage } from "../../Pages/TemplatesPage";
import { dateFormatFull, dateFormatCompact } from "../../../utils/utils";
import Popup from "reactjs-popup";
import { Questions } from "./Questions";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  id,
}) => {
  const history = useHistory();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      {isShowing && (
        <div
          className="home-patient-profile-container"
          onClick={(e: any) => {
            if (
              e.target.className !== "home-patient-profile-info-btn" &&
              e.target.className !== "home-patient-profile-info-icon" &&
              e.target.nodeName !== "path" &&
              e.target.nodeName !== "svg"
            ) {
              history.push(`/template/${id}`);
            } else {
              fetch(`/api/student/1/templates/${id}`, {
                method: "DELETE",
              })
                .then(() => {
                  setIsShowing(false);
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }}
        >
          <div className="home-patient-profile-name-col">{name}</div>
          <div className="home-patient-profile-date-col"> </div>
          <div className="home-patient-profile-last-modified-col">
            {windowWidth < 1080
              ? dateFormatCompact(date * 1000)
              : dateFormatFull(date * 1000)}
          </div>
          <div className="home-patient-profile-info-btn">
            <div className="home-patient-profile-info-icon">
              <FontAwesomeIcon icon="trash" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
