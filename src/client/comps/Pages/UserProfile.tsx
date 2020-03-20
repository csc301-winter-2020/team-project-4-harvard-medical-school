import React, { useEffect, useState } from "react";
import { User } from "../../../server/server";
import { MyToast } from "../../utils/types";
import { ToastContainer, toast } from "react-toastify";
import { Header } from "../SubComponents/Header";
import { HelixLoader } from "../SubComponents/HelixLoader";
import { useHistory } from "react-router";

interface UserProfileProps {
  id: number;
}

export const UserProfile: React.FC<UserProfileProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);

  const history = useHistory();

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw new Error(`Error code: ${response.status}, ${response.statusText}`);
        }
      })
      .then((data:any) => {
        console.log(data);
        setIsLoading(false);
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
      <div>
        Content
      </div>
    </>
  );
};
