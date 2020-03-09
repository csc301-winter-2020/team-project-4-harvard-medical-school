import React, { useState, useEffect } from "react";
import { Header } from "../SubComponents/Header";
import { Questions } from "../SubComponents/Templates/Questions";
import "../../scss/templates/templates";
import { contentType } from "../../utils/types";
import { dummyTemplates } from "../../utils/dummyTemplates";
import { TemplateRow } from "../SubComponents/Templates/TemplateRow";
import { max } from "../../utils/utils";
import { useHistory } from "react-router";
import { HelixLoader } from "../SubComponents/HelixLoader";
import { ToastContainer, toast } from "react-toastify";

interface TemplatesPageProps {}

export type Template = {
  user_id: number;
  template_id: number;
  template_name: string;
  date_millis: number;
  template: TemplatePage[];
};

export type TemplatePage = {
  title: contentType;
  fields: TemplateAssignment[];
  visible: boolean;
};

export type TemplateAssignment = {
  name: string;
  value: boolean;
};

export const TemplatesPage: React.FC<TemplatesPageProps> = ({}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetch("/api/student/1/templates")
    .then(res => {
      console.log(res);
      if (res.status === 200){
        return res.json();
      } else {
        throw new Error(res.status + " " + res.statusText);
      }
    })
    .then(data => {
      setTemplates(data);
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <>
      <Header
        showSearch={true}
        searchValue={searchValue}
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        setSearchValue={setSearchValue}
        placeholder={"Search Templates"}
      />
      {isLoading && <HelixLoader message="Loading Templates..."/>}
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <div className="templates-outermost">
        <div className="templates-main-container">
          <div className="templates-title" style={{display: "block", marginRight: "0"}}>
            <h1>Template Editor</h1>
            <div className="home-page-separator-line"></div>
            <div className="home-page-patient-header-grid">
              <p className="home-page-patient-header-grid-name-col">Name</p>
              <p className="home-page-patient-header-grid-created-col"> </p>
              <p className="home-page-patient-header-grid-last-modified-col">
                Last Modified
              </p>
            </div>
          </div>
          <div className="templates-scroller">
            {templates
              .filter(t =>
                t.template_name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              )
              .map((t: Template, index) => {
                return (
                  <TemplateRow
                    key={index}
                    id={t.template_id}
                    name={t.template_name}
                    date={t.date_millis}
                    templatePages={t.template}
                  />
                );
              })}
            <div
              className="home-page-content-whitespace"
              style={{ height: max(window.innerHeight - 400, 0) }}
            >
              <div className="home-page-content-whitespace-logo"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="template-floating-add-btn" onClick={() => {
        history.push("/templates/new");
      }}>New Template</div>
    </>
  );
};
