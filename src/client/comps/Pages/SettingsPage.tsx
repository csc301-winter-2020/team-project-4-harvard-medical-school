/**
 * This is the page that users get to when they click on the menu in the header
 * and then click settings. Its the one with the picture and the radio buttons
 * to change the user preferences like sidebar and text/canvas default mode.
 */

import React, { useState, useEffect } from "react";
import { Header } from "../SubComponents/Header";
import "../../scss/settings/settings.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { defaultAvatar, numberToYearStr, dummyData } from "../../utils/utils";
import { HelixLoader } from "../SubComponents/HelixLoader";
import { toast, ToastContainer } from "react-toastify";
import { MyToast, userData } from "../../utils/types";
import { LeftSideBackButton } from "../SubComponents/Home/LeftSideBackButton";

interface SettingsPageProps {}

async function getUserSettings() {
  try {
    const res = await fetch(`/api/me`, { method: "GET" });
    return await res.json();
  } catch {
    console.log("Something went wrong... IN SETTINGS PAGE GET USER SETTINGS FUNC");
  }
}

async function patchUserInfo(data: userData) {
  console.log(data);
  fetch(`/me`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  })
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      console.log(err);
    });
}

export const SettingsPage: React.FC<SettingsPageProps> = ({}) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<userData>(dummyData);
  const myToast: MyToast = toast as any;

  useEffect(() => {
    getUserSettings().then(data => {
      setUserData({
        id: data.id,
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        year: data.year,
        user_type: data.user_type,
        avatar_url: data.avatar_url,
        default_mode: data.default_mode,
        default_sidebar: data.default_sidebar,
        location: data.location,
      });

      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <Header
        placeholder=""
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={false}
      />
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      {isLoading && <HelixLoader message="Loading Settings..." />}
      <div className="settings-outermost">
        <div className="settings-main-container">
          <div className="settings-top-container">
            <div
              className="settings-avatar"
              style={{
                backgroundImage: `url("${userData.avatar_url}")`,
              }}
            ></div>
            <div className="settings-top-info">
              {!isEditing ? (
                <>
                  <h1 className="settings-name">{userData.first_name}</h1>
                  <p className="settings-name">{"  "}</p>
                  <h1 className="settings-name">{userData.last_name}</h1>
                </>
              ) : (
                <>
                  <input
                    className="settings-name"
                    type="text"
                    placeholder="First Name"
                    maxLength={16}
                    value={userData.first_name}
                    onChange={e =>
                      setUserData({ ...userData, first_name: e.target.value })
                    }
                  />
                  <input
                    className="settings-name"
                    type="text"
                    maxLength={16}
                    placeholder="Last Name"
                    value={userData.last_name}
                    onChange={e =>
                      setUserData({ ...userData, last_name: e.target.value })
                    }
                  />
                </>
              )}
              <div></div>
              {!isEditing && (
                <h3 className="settings-year-text">
                  {numberToYearStr[userData.year]} Year {userData.user_type}
                </h3>
              )}
              {isEditing && (
                <>
                  <input
                    className="settings-year-input"
                    type="number"
                    min="1"
                    max="4"
                    step="1"
                    value={userData.year}
                    onChange={(e: any) => {
                      setUserData({
                        ...userData,
                        year: e.target.value,
                      });
                    }}
                  />
                  <h3 className="settings-year-text">Year Student</h3>
                </>
              )}
              {!isEditing && (
                <h3 style={{ marginBottom: "10px" }}>{userData.location}</h3>
              )}
              {isEditing && (
                <>
                  <input
                    id="settings-avatar-input"
                    type="text"
                    placeholder="Location"
                    value={userData.location}
                    onChange={(e: any) => {
                      setUserData({
                        ...userData,
                        location: e.target.value,
                      });
                    }}
                  />
                  <div></div>
                </>
              )}
              {isEditing && (
                <>
                  <h3 className="settings-avatar-text">Avatar URL:</h3>
                  <input
                    type="text"
                    id="settings-avatar-input"
                    placeholder="https://www.example.com/my_picture.jpg"
                    value={userData.avatar_url}
                    onChange={(e: any) => {
                      setUserData({
                        ...userData,
                        avatar_url: e.target.value,
                      });
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div className="settings-bottom-container">
            <h3>Default Input Mode</h3>
            <label>
              <input
                type="radio"
                name="defaultMode"
                checked={userData.default_mode === "Writing"}
                onChange={() => {
                  if (isEditing) {
                    setUserData({
                      ...userData,
                      default_mode: "Writing",
                    });
                  } else {
                    myToast.info("Click the pencil icon to edit.");
                  }
                }}
              />
              <p>Writing</p>
            </label>

            <label>
              <input
                type="radio"
                name="defaultMode"
                checked={userData.default_mode === "Typing"}
                onChange={() => {
                  if (isEditing) {
                    setUserData({
                      ...userData,
                      default_mode: "Typing",
                    });
                  } else {
                    myToast.info("Click the pencil icon to edit.");
                  }
                }}
              />
              <p>Typing</p>
            </label>

            <label>
              <input
                type="radio"
                name="defaultMode"
                checked={userData.default_mode === "Both"}
                onChange={() => {
                  if (isEditing) {
                    setUserData({
                      ...userData,
                      default_mode: "Both",
                    });
                  } else {
                    myToast.info("Click the pencil icon to edit.");
                  }
                }}
              />
              <p>Show Both</p>
            </label>

            <h3>Show Sidebar by Default</h3>
            <label>
              <input
                type="radio"
                name="sidebarDefault"
                checked={userData.default_sidebar}
                onChange={() => {
                  if (isEditing) {
                    setUserData({
                      ...userData,
                      default_sidebar: true,
                    });
                  } else {
                    myToast.info("Click the pencil icon to edit.");
                  }
                }}
              />
              <p>Yes</p>
            </label>

            <label>
              <input
                type="radio"
                name="sidebarDefault"
                checked={!userData.default_sidebar}
                onChange={() => {
                  if (isEditing) {
                    setUserData({
                      ...userData,
                      default_sidebar: false,
                    });
                  } else {
                    myToast.info("Click the pencil icon to edit.");
                  }
                }}
              />
              <p>No</p>
            </label>
          </div>
        </div>

        <div
          className="settings-toggle-edit-btn"
          onClick={() => {
            if (isEditing) {
              console.log(userData);
              patchUserInfo({
                id: userData.id,
                default_mode: userData.default_mode,
                default_sidebar: userData.default_sidebar,
                username: userData.username,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                year: userData.year,
                user_type: userData.user_type,
                avatar_url: userData.avatar_url,
                location: userData.location,
              })
                .then(res => {
                  console.log(res);
                  myToast.success("Your settings have been saved.");
                })
                .catch(err => {
                  console.log(err);
                  myToast.warn("There was an error saving your settings.");
                });
            }
            setIsEditing(!isEditing);
          }}
        >
          {!isEditing ? (
            <FontAwesomeIcon icon="pencil-alt" size="2x" />
          ) : (
            <FontAwesomeIcon icon="check" size="2x" />
          )}
        </div>
      </div>
      <LeftSideBackButton/>
    </>
  );
};
