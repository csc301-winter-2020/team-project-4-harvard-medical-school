import React from "react";
import {User} from '../../../server/server';

export const CurUser: React.FC = ({}) => {

  const user:User = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {user.username}
      <button
        onClick={() =>
          localStorage.clear()
        }
      >
        Logout
      </button>
    </div>
  );
};
