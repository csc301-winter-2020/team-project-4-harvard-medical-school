import React, { useState, useEffect } from "react";
import "../../../scss/instructor/instructor-page.scss";
import { Header } from "../../SubComponents/Header";
import { InstructorClassRow } from "../../SubComponents/Instructor/InstructorClassRow";
import { ToastContainer, toast } from "react-toastify";
import { max } from "../../../utils/utils";
import { HelixLoader } from "../../SubComponents/HelixLoader";

interface InstructorPageProps {
}

interface InstructorClass {
  name: string;
  id: number;
}

export const InstructorPage: React.FC<InstructorPageProps> = (
  props: InstructorPageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [classes, setClasses] = useState<InstructorClass[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetch((`/api/me`))
    .then(response => {
      if(response.status === 200){
        return response.json()  
      }else {
        throw new Error(`Error code: ${response.status}, ${response.statusText}`);
      }
    })
    .then((data:any) => {
      console.log(data.id)
      return data.id;
    })
    .then((instructorId: number) =>{
      return fetch(`/api/classesOfInstructors/${instructorId}`)
    })
    .then(response => {
      if (response.status === 200){
        return response.json()
      } else {
        throw new Error(`Error code: ${response.status}, ${response.statusText}`);
      }
    })
    .then((data:any) => {
      console.log(data);
      const allClasses:InstructorClass[] = [];
      data.forEach((row:any) => {
        allClasses.push({
          name: row.name,
          id: row.id,
        });
      });
      setClasses(allClasses);
    })
    .catch((err:any) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, []);

  return <>
    <Header
      placeholder={"Search Classes..."}
      isAvatarPopup={isAvatarPopup}
      setIsAvatarPopup={setIsAvatarPopup}
      showSearch={true}
      searchValue={searchVal}
      setSearchValue={setSearchVal}
    />
    <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    {isLoading && <HelixLoader message="Please Wait..." />}
      <div className="home-page-content-container">
        <div className="home-page-your-patients-title">Your Classes</div>
        <div className="home-page-separator-line"/>
        <div className="home-page-patient-header-grid"/>
        <div className="home-page-content">
          {
            classes.length === 0 && <p style={{marginLeft: "10px"}}>You do not have any classes you are instructing. Please ask your administrator to assign you to a class.</p>
          }
        {classes.filter(s => s.name.toLowerCase().includes(searchVal.toLowerCase())).map((c, index:number) =>
          <InstructorClassRow
            key={index}
            name={c.name}
            classID={c.id}
          />
        )}
          <div
            className="home-page-content-whitespace"
            style={{ height: max(window.innerHeight - 400, 0) }}
          >
            <div className="home-page-content-whitespace-logo"/>
          </div>
        </div>
      </div>
  </>;
};
