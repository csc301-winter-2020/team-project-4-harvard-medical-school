import React from "react";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface LeftSideBackButtonProps {}

export const LeftSideBackButton: React.FC<LeftSideBackButtonProps> = ({}) => {
  const history = useHistory();
  return (
    <>
      <div
        className="left-side-back-btn"
        onClick={() => {
          history.goBack();
        }}
      >
        <FontAwesomeIcon icon="arrow-left" size="2x" />
      </div>
    </>
  );
};
