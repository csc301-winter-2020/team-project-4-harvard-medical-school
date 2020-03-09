import React, { useEffect, useState } from "react";
import { Template, TemplatePage } from "../../Pages/TemplatesPage";
import { dateFormatFull, dateFormatCompact } from "../../../utils/utils";
import Popup from "reactjs-popup";
import { Questions } from "./Questions";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

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
  const mToast:any = toast;
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
            <Popup
              trigger={
                <div className="home-patient-profile-info-icon">
                  <FontAwesomeIcon icon="trash" size={innerWidth < 1080 ? "2x" : "1x"}/>
                </div>
              }
              modal
              closeOnDocumentClick
            >
              {(close: Function) => (
                <div id="modal-container">
                  <div id="modal-header"> Delete Template </div>
                  <div id="modal-content">
                    {" "}
                    Deleting a template is permenant. Are you sure you want to
                    continue?
                    <div id="modal-btn-container">
                      <button
                        onClick={() => {
                          close();
                          fetch(`/api/student/1/templates/${id}`, {
                            method: "DELETE",
                          })
                            .then(() => {
                              setIsShowing(false);
                              mToast.success("Successfully deleted template.");
                            })
                            .catch(err => {
                              console.log(err);
                              mToast.warn(
                                "There was an error deleting the template."
                              );
                            });
                        }}
                      >
                        Yes, delete this template.
                      </button>
                      <button onClick={() => close()}>No, take me back!</button>
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      )}
    </>
  );
};
