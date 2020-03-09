import React, { useEffect, useState } from "react";
import {User} from '../../../server/server';
const Axios = require('axios').default;

export const CurUser: React.FC = ({}) => {
  const [loading, setloading] = useState(true);
  const [confirmedUsername, setConfirmedUsername] = useState("");
  const user:User | null = JSON.parse(localStorage.getItem("user"));
  

  useEffect(() => {
    const componentDidMount = async () => {
    try {
        const result = await Axios.get(`/api/me`);
        setConfirmedUsername(result.data.username);
    } catch{
      setConfirmedUsername("null");
    } finally {
      setloading(false);
    }

    }
    componentDidMount();
  })

  return (
    <div>
      {
        user === null ? <div>There is nothing in your LocalStorage.</div> : <div>LocalStorage says your username is {user.username}</div>
      }
      
      {
        loading && <div> checking your username... </div>
      }
      Your confirmed username is {confirmedUsername};
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
