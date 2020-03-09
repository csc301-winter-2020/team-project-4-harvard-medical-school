import React, { useEffect } from "react";
const Axios = require('axios').default;

export const Page: React.FC = ({}) => {
  
  useEffect(() => {
    const getLoggedInUser = async () => {
      try{
        const result:any = await Axios.get(`/api/me`);
        console.log(JSON.stringify(result.data));
        localStorage.setItem("user", JSON.stringify(result.data));
      }catch {
        console.log(`No logged in user found.`);
      }
    }
    getLoggedInUser();
  });

  return (
    <div className="my-class">
      Page
    </div>
  );
};
