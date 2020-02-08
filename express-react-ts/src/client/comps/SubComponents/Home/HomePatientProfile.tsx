import React from "react";

interface HomePatientProfileProps {
  title: string;
}

export const HomePatientProfile: React.FC<HomePatientProfileProps> = ({
  title
}) => {
  return <div className="home-patient-profile-container">{title}</div>;
};
