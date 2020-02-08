import React, { useReducer, Fragment, useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import "!style-loader!css-loader!react-toastify/dist/ReactToastify.css";
import { Footer } from "../SubComponents/Footer";

type CanvasState = {
  isPortraitMode: boolean;
};

function reducer(
  state: CanvasState,
  action: { type: string; value: string; }
): CanvasState {
  switch (action.type) {
    case "resize":
      return {
        ...state,
        isPortraitMode: parseInt(action.value) < 1024
      };
    default:
      throw new Error("Invalid type on action.");
  }
}

const initialState: CanvasState = {
  isPortraitMode: false
};

export const Student: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isPortraitMode } = state;

  useEffect(() => {
    const handleResize = () =>
      dispatch({ type: "resize", value: String(window.innerWidth) });
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleUndo);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleUndo);
    };
  });

  let inputRef: any;
  function saveCanvas() {
    let image: any = inputRef.canvas.drawing.toDataURL("image/png").replace("image/png", "image/octet-stream");
    window.location.href = image;
  }

  function clearCanvas() {
    inputRef.clear();
  }

  function undoCanvas() {
    inputRef.undo();
  }

  function handleUndo(event) {
    if (event.ctrlKey && event.keyCode === 90) {
      inputRef.undo();
    }
  }

  return (
    <Fragment>
      <CanvasDraw ref={canvasDraw => (inputRef = canvasDraw)} canvasWidth={window.innerWidth - 50} canvasHeight={window.innerHeight - 50} lazyRadius={0} brushRadius={1}></CanvasDraw>
      <button onClick={clearCanvas}>Clear</button>
      <button onClick={saveCanvas}>Save</button>
      <button onClick={undoCanvas}>Undo</button>

      { !isPortraitMode && <Footer /> }
    </Fragment>
  );
};
