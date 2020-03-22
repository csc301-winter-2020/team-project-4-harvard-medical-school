import React, { useEffect, useState } from "react";
import { User } from "../../../server/server";
import { MyToast } from "../../utils/types";
import { ToastContainer, toast } from "react-toastify";
import { Header } from "../SubComponents/Header";
import { HelixLoader } from "../SubComponents/HelixLoader";
import { useHistory } from "react-router";
import { dummyData, numberToYearStr } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface UserProfileProps {
  id: number;
}

export const UserProfile: React.FC<UserProfileProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [userData, setUserData] = useState(dummyData);

  const history = useHistory();

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `Error code: ${response.status}, ${response.statusText}`
          );
        }
      })
      .then((data: any) => {
        console.log(data);
        setIsLoading(false);
        setUserData({
          avatar_url: data.avatar_url,
          default_mode: data.default_mode,
          default_sidebar: data.default_sidebar,
          email: data.email,
          first_name: data.first_name,
          id: data.id,
          last_name: data.last_name,
          user_type: data.user_type,
          username: data.username,
          year: data.year,
          location: data.location,
        });
      })
      .catch((err: any) => {
        console.log(err);
        history.goBack();
      });
  }, []);

  return (
    <>
      <Header
        placeholder={""}
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={false}
      />
      {isLoading && <HelixLoader message="Loading User..." />}
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
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
              <h1 className="settings-name">{userData.first_name}</h1>
              <p className="settings-name">{"  "}</p>
              <h1 className="settings-name">{userData.last_name}</h1>
              <div></div>
              <h3 className="settings-year-text">
                {numberToYearStr[userData.year]} Year {userData.user_type}
              </h3>
              <h3 style={{ marginBottom: "10px" }}>{userData.location}</h3>
            </div>
          </div>
          <div className="settings-bottom-container"></div>
        </div>
      </div>
      <div
        className="question-floating-back-btn"
        onClick={() => {
          history.goBack();
        }}
      >
        <FontAwesomeIcon icon="arrow-left" size="2x" />
      </div>
    </>
  );
};
