import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CanvasTextToggleButtonsProps {
  isShowingCanvas: boolean;
  isShowingText: boolean;
  setIsShowingCanvas: Function;
  setIsShowingText: Function;
}

export const CanvasTextToggleButtons: React.FC<CanvasTextToggleButtonsProps> = ({
  isShowingCanvas,
  isShowingText,
  setIsShowingCanvas,
  setIsShowingText,
}) => {
  return (
    <div className="form-span-group">
      <span
        style={{
          borderTopLeftRadius: "3px",
          borderBottomLeftRadius: "3px",
          color: isShowingCanvas ? "white" : "black",
          backgroundColor: isShowingCanvas ? "#791523" : "white",
        }}
        onClick={() => setIsShowingCanvas(!isShowingCanvas)}
      >
        <FontAwesomeIcon icon="pencil-alt" />
      </span>
      <span
        style={{
          borderTopRightRadius: "3px",
          borderBottomRightRadius: "3px",
          color: isShowingText ? "white" : "black",
          backgroundColor: isShowingText ? "#791523" : "white",
        }}
        onClick={() => setIsShowingText(!isShowingText)}
      >
        <FontAwesomeIcon icon="font" />
      </span>
    </div>
  );
};
