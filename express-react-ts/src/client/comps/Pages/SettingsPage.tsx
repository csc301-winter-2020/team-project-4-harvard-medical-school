import React, { useState } from "react";
import { Header } from "../SubComponents/Header";
import "../../scss/settings/settings.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SettingsPageProps {}

export const SettingsPage: React.FC<SettingsPageProps> = ({}) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Danny Heap");
  const [defaultMode, setDefaultMode] = useState<"typing" | "both" | "writing">(
    "writing"
  );

  return (
    <>
      <Header
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={false}
      />
      <div className="settings-outermost">
        <div className="settings-main-container">
          <div className="settings-top-container">
            <div className="settings-avatar"></div>
            <div className="settings-top-info">
              {!isEditing ? (
                <h1>{name}</h1>
              ) : (
                <input type="text" placeholder="Enter your name..." value={name} onChange={e => setName(e.target.value)} />
              )}
              <h3>1st Year Student</h3>
              <h3>Toronto General Hospital</h3>
            </div>
          </div>
          <div className="settings-bottom-container">
            <h3>Default Input Mode</h3>
            <label>
              <input
                type="radio"
                name="defaultMode"
                checked={defaultMode === "writing"}
                onChange={() => {
                  setDefaultMode("writing");
                }}
              />
              <p>Writing</p>
            </label>

            <label>
              <input
                type="radio"
                name="defaultMode"
                checked={defaultMode === "typing"}
                onChange={() => {
                  setDefaultMode("typing");
                }}
              />
              <p>Typing</p>
            </label>

            <label>
              <input
                type="radio"
                name="defaultMode"
                checked={defaultMode === "both"}
                onChange={() => {
                  setDefaultMode("both");
                }}
              />
              <p>Show Both</p>
            </label>
          </div>
        </div>

        <div
          className="settings-toggle-edit-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          {!isEditing ? (
            <FontAwesomeIcon icon="pencil-alt" size="2x" />
          ) : (
            <FontAwesomeIcon icon="check" size="2x" />
          )}
        </div>
      </div>
    </>
  );
};
