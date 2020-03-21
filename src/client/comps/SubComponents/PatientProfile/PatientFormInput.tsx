import React from "react";
import { CanvasTextToggleButtons } from "./CanvasTextToggleButtons";
import { CanvasComp } from "../CanvasComp";

interface PatientFormInputProps {
  title: string;
  subtext?: string;
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
  canvasData?: string;
  isTextArea: boolean;
}

export const PatientFormInput: React.FC<PatientFormInputProps> = ({
  title,
  id,
  subtext,
  isShowingCanvas,
  setIsShowingCanvas,
  isShowingText,
  inputVal,
  inputType,
  placeholder,
  dispatch,
  setIsShowingText,
  canvasHeight,
  isTextArea,
  canvasWidth,
  canvasData,
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
      {subtext && (<p>{subtext}</p>)}
      {isShowingCanvas && (
        <CanvasComp
          id={id}
          dispatch={dispatch}
          initialHeight={canvasHeight}
          initialWidth={canvasWidth}
          saveData={canvasData}
        />
      )}
      {isShowingText && !isTextArea && (
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

      {isShowingText && isTextArea && (
        <textarea
          className="patient-form-textarea"
          value={inputVal}
          name={id}
          placeholder={placeholder}
          onChange={e =>
            dispatch({
              type: "field",
              fieldName: e.target.name,
              value: e.target.value,
            })
          }
          
        ></textarea>
      )}
      <div className="form-spacer"></div>
    </>
  );
};
