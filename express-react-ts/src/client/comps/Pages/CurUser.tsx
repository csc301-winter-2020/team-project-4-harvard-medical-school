import React, { useContext } from "react";
import { UserContext } from "../../Contexts/userContext";

interface CurUserProps {}

export const CurUser: React.FC<CurUserProps> = ({}) => {
  //   const { user, setUser } = useContext(UserContext);
  const msg = useContext(UserContext);
  return (
    <div>
      {/* {user.firstName} {user.lastName} {user.username}
      <button
        onClick={() =>
          setUser({ firstName: "Joe", lastName: "Bob", username: "joebob" })
        }
      >
        CLick me
      </button> */}
      {msg}
    </div>
  );
};
