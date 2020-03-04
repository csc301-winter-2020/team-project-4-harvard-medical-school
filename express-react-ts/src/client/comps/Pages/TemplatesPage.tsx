import React, { useState, useEffect } from "react";
import { Header } from "../SubComponents/Header";
import { Questions } from "../SubComponents/Templates/Questions";
import "../../scss/templates/templates";
import { contentType } from "../../utils/types";
import { dummyTemplates } from "../../utils/dummyTemplates";
import { TemplateRow } from "../SubComponents/Templates/TemplateRow";

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
  const [templates, setTemplates] = useState(dummyTemplates);
  
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
      <div className="templates-outermost">
        <div className="templates-main-container">
          <div className="templates-title">
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
          </div>
        </div>
      </div>
    </>
  );
};
