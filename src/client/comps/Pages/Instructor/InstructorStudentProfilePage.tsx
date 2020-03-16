import React, { useState } from "react";
import { Header } from "../../SubComponents/Header";

interface InstructorStudentProfilePageProps {
}

interface InstructorStudentProfile {
  name: string;
  pictureURL: string;
}

const mockData: InstructorStudentProfile[] = [
];

export const InstructorStudentProfilePage: React.FC<InstructorStudentProfile> = (
  props: InstructorStudentProfilePageProps
) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  return <>
    <Header
      placeholder={""}
      isAvatarPopup={isAvatarPopup}
      setIsAvatarPopup={setIsAvatarPopup}
      showSearch={true}
      searchValue={searchVal}
      setSearchValue={setSearchVal}
    />
    <div className="">
      Instructor student profile page
    </div>
  </>;
};
