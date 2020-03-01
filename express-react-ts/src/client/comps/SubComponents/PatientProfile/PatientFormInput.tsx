import React from "react";
import { CanvasTextToggleButtons } from "./CanvasTextToggleButtons";
import { CanvasComp } from "../CanvasComp";

interface PatientFormInputProps {
  title: string;
  dispatch: Function;
  isShowingCanvas: boolean;
  setIsShowingCanvas: Function;
  isShowingText: boolean;
  setIsShowingText: Function;
  inputVal: string;
  inputType: string;
  placeholder: string;
  id: string;
  canvasHeight: number;
  canvasWidth: number;
}

export const PatientFormInput: React.FC<PatientFormInputProps> = ({
  title,
  id,
  isShowingCanvas,
  setIsShowingCanvas,
  isShowingText,
  inputVal,
  inputType,
  placeholder,
  dispatch,
  setIsShowingText,
  canvasHeight,
  canvasWidth,
}) => {
  return (
    <>
      <h3>{title}</h3>
      <CanvasTextToggleButtons
        isShowingCanvas={isShowingCanvas}
        setIsShowingCanvas={setIsShowingCanvas}
        isShowingText={isShowingText}
        setIsShowingText={setIsShowingText}
      />
      {isShowingCanvas && (
        <CanvasComp id={id} initialHeight={canvasHeight} initialWidth={canvasWidth} />
      )}
      {isShowingText && (
        <input
          className="form-input-short"
          placeholder={placeholder}
          value={inputVal}
          type={inputType}
          name={id}
          onChange={e =>
            dispatch({
              type: "field",
              fieldName: e.target.name,
              value: e.target.value,
            })
          }
        />
      )}
      <div className="form-spacer"></div>
    </>
  );
};
