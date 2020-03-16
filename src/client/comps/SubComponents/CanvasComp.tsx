import React, { useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import "../../scss/canvas-draw.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { max, now } from "../../utils/utils";

interface CanvasCompProps {
  initialHeight: number;
  initialWidth: number;
  id: string;
  dispatch: Function;
  saveData: string;
  // loadSaveData: boolean;
}

export const CanvasComp: React.FC<CanvasCompProps> = ({
  initialHeight,
  initialWidth,
  id,
  dispatch,
  saveData,
  // loadSaveData,
}) => {
  const [canvasHeight, setCanvasHeight] = useState(initialHeight);
  const [canvasWidth, setCanvasWidth] = useState(initialWidth);
  const [brushRadius, setBrushRadius] = useState(3);
  const [isErasing, setIsErasing] = useState(false);
  const [brushColor, setBrushColor] = useState("black");
  const [lastBrushColor, setLastBrushColor] = useState("black");
  const [catenaryColor, setCatenaryColor] = useState("black");
  const [loadSaveData, setLoadSaveData] = useState(true);
  const [lastDrag, setLastDrag] = useState(now());

  let inputRef: any;
  function saveCanvas() {
    let image: any = inputRef.canvas.drawing
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    window.location.href = image;
  }

  function clearCanvas() {
    inputRef.clear();
  }

  function dispatchCanvasState() {
    dispatch({
      type: 'field',
      fieldName: id + 'Canvas',
      value: inputRef.getSaveData()
    });
  }

  function changeColor(color: string) {
    let ctx = inputRef.canvas["drawing"].getContext("2d");
    if (ctx.globalCompositeOperation !== "destination-out") {
      setBrushColor(color);
      setCatenaryColor(color);
    }
  }

  function toggleErase() {
    let ctx = inputRef.canvas["drawing"].getContext("2d");
    if (ctx.globalCompositeOperation === "destination-out") {
      ctx.globalCompositeOperation = "source-over";
      setBrushRadius(3);
      setIsErasing(false);
      setBrushColor(lastBrushColor);
    } else {
      ctx.globalCompositeOperation = "destination-out";
      setBrushRadius(12);
      setIsErasing(true);
      setLastBrushColor(brushColor);
      setBrushColor("rgba(250,250,250,1)");
    }
  }

  function dragging(event: any) {
    if (now() - lastDrag > 10) {
      setLastDrag(now());
      if (event.clientX !== 0 && event.clientY !== 0) {
        const boundingRect = document
          .querySelector(`#canvas-draw-container-${id}`)
          .getBoundingClientRect();
        setCanvasWidth(max(event.clientX - boundingRect.left, initialWidth));
        setCanvasHeight(max(event.clientY - boundingRect.top, initialHeight));
      }
    }
  }

  useEffect(() => {
    if (loadSaveData && saveData) {
      console.log(saveData);
      inputRef.loadSaveData(saveData, true);
      setLoadSaveData(false);
    }
  }, [saveData]);

  return (
    <>
      <div
        id={id}
        className="canvas-draw-outermost"
        style={{ width: String(canvasWidth), height: String(canvasHeight) }}
      >
        <div
          className="canvas-draw-container"
          id={`canvas-draw-container-${id}`}
          onMouseUp={dispatchCanvasState}
        >
          <CanvasDraw
            ref={(canvasDraw: any) => (inputRef = canvasDraw)}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            lazyRadius={0}
            brushRadius={brushRadius}
            brushColor={brushColor}
            catenaryColor={catenaryColor}
          />
        </div>

        <div className="canvas-draw-colors">
          <div
            className="canvas-draw-btn"
            style={{ backgroundColor: "black" }}
            onClick={() => changeColor("black")}
          ></div>
          <div
            className="canvas-draw-btn"
            style={{ backgroundColor: "#a51c30" }}
            onClick={() => changeColor("#a51c30")}
          ></div>
          <div
            className="canvas-draw-btn"
            style={{ backgroundColor: "#30a51c" }}
            onClick={() => changeColor("#30a51c")}
          ></div>
          <div
            className="canvas-draw-btn"
            style={{ backgroundColor: "#0097D1" }}
            onClick={() => changeColor("#0097D1")}
          ></div>
        </div>

        <div className="canvas-draw-resize-btn" onDrag={dragging} draggable>
          <FontAwesomeIcon icon="expand-arrows-alt" size="1x" />
        </div>
        <div className="canvas-draw-btn-group">
          <div className="canvas-draw-btn" onClick={clearCanvas}>
            <FontAwesomeIcon icon="trash" size="1x" />
          </div>
          <div
            className="canvas-draw-btn"
            id="canvasEraser"
            onClick={toggleErase}
            style={{backgroundColor: !isErasing ? "#791523" : "#a51c30"}}
          >
            <FontAwesomeIcon icon="eraser" size="1x" />
          </div>
        </div>
      </div>
    </>
  );
};
