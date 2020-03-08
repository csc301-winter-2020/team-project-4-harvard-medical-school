import React, { useState, useEffect } from "react";
import { Header } from "../SubComponents/Header";
import "../../scss/settings/settings.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HelixLoader } from "../SubComponents/HelixLoader";

interface SettingsPageProps {}

async function getUserSettings(){
  const res = await fetch(`/api/me`, {method: 'GET'})
  return await res.json()
}

async function patchUserInfo(userID: number, data){
  const res = await fetch(`/me`, {
    method: 'PATCH',
    user: {id: userID},
    body: JSON.stringify(data)
  })
}

type userData = {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
  year: number
  user_type: 'Student' | 'Educator' | 'Administrator'
  avatar_url: string
  default_mode: 'Typing' | 'Both' | 'Writing'
  default_sidebar: boolean
}

const dummyData: userData = {
  id: -1,
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  year: 0,
  user_type: 'Student',
  avatar_url: '',
  default_mode: 'Typing',
  default_sidebar: true
}

export const SettingsPage: React.FC<SettingsPageProps> = ({}) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Danny Heap");
  const [isLoading, setIsLoading] = useState(true)
  // const [defaultMode, setDefaultMode] = useState<"Typing" | "Both" | "Writing">(
  //   "Writing"
  // );
  // const [showSidebarDefault, setShowSidebarDefault] = useState<boolean>(true);


  const [userData, setUserData] = useState<userData>(dummyData)

  useEffect(() => {
    getUserSettings().then((data) => {
      setUserData({
        id: data.id,
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        year: data.year,
        user_type: data.user_type,
        avatar_url: data.avatar_url,
        default_mode: data.default_mode,
        default_sidebar: data.default_sidebar
      })

      setIsLoading(false)
    })
  }, [])

  return (
    <>
      <Header
        placeholder=""
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={false}
      />
      {isLoading && <HelixLoader message="Loading Settings..."/>}
      <div className="settings-outermost">
        <div className="settings-main-container">
          <div className="settings-top-container">
            <div className="settings-avatar"></div>
            <div className="settings-top-info">
              {!isEditing ? (
                <h1>{userData.first_name+' '+userData.last_name}</h1>
              ) : (
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={name}
                  // TODO : change this to first and last names
                  onChange={e => setName(e.target.value)}
                />
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
                checked={userData.default_mode === "Writing"}
                onChange={() => {
                  setUserData({
                    ...userData,
                    default_mode: "Writing"
                  });
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
                  setUserData({
                    ...userData,
                    default_mode: "Typing"
                  });
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
                  setUserData({
                    ...userData,
                    default_mode: "Both"
                  });
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
                  setUserData({
                    ...userData,
                    default_sidebar: true
                  });
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
                  setUserData({
                    ...userData,
                    default_sidebar: false
                  });
                }}
              />
              <p>No</p>
            </label>
          </div>
        </div>

        <div
          className="settings-toggle-edit-btn"
          onClick={() => {
            if(isEditing){
              patchUserInfo(userData.id, {
                username: userData.username,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                password: userData.password,
                year: userData.year,
                user_type: userData.user_type,
                avatar_url: userData.avatar_url
              }).then((res) => {
                console.log(res)
              }).catch((err) => {
                console.log(err)
              })
            }
            setIsEditing(!isEditing)
          }}
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
