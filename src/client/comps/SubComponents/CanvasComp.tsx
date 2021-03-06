/**
 * This represents a canvas and its
 * behaviours, including the buttons associated with it.
 */

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
  hidden?: boolean;
}

const HANDWRITING_CANVASES = [
  "chiefComplaint",
  "HPI",
  "pastMedHist",
  "pastHospits",
  "medications",
  "allergies",
];

const CANVAS_BLACK = "black";
const CANVAS_RED = "#a51c30";
const CANVAS_DARK_RED = "#791523";
const CANVAS_BLUE = "#0097D1";
const CANVAS_GREEN = "#30a51c";

export const CanvasComp: React.FC<CanvasCompProps> = ({
  initialHeight,
  initialWidth,
  id,
  dispatch,
  saveData,
  hidden,
}) => {
  const [canvasHeight, setCanvasHeight] = useState(initialHeight);
  const [canvasWidth, setCanvasWidth] = useState(initialWidth);
  const [brushRadius, setBrushRadius] = useState(3);
  const [isErasing, setIsErasing] = useState(false);
  const [loadSaveData, setLoadSaveData] = useState(true);
  const [brushColor, setBrushColor] = useState(CANVAS_BLACK);
  const [lastBrushColor, setLastBrushColor] = useState(CANVAS_BLACK);
  const [catenaryColor, setCatenaryColor] = useState(CANVAS_BLACK);
  const [lastDrag, setLastDrag] = useState(now());
  const [inputRef, setInputRef] = useState(null);
  let mobileLastDrag = now();

  function saveCanvas() {
    let image: any = inputRef.canvas.drawing
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    window.location.href = image;
  }

  function clearCanvas() {
    inputRef.clear();
    dispatchCanvasState();
  }

  function sendCanvasImages() {
    // Send the canvas as an image for fields that need handwriting recognition
    if (HANDWRITING_CANVASES.includes(id)) {
      dispatch({
        type: "field",
        fieldName: id + "Image",
        value: inputRef.canvas.drawing
          .toDataURL("image/png")
          .replace("data:image/png;base64,", ""),
      });
    }
  }

  function dispatchCanvasState() {
    dispatch({
      type: "field",
      fieldName: id + "Canvas",
      value: inputRef.getSaveData(),
    });

    sendCanvasImages();
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
      setBrushColor("rgba(255,255,255,1)");
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

  function loadCanvas() {
    try {
      if (!saveData) return;
      const saveDataObj = JSON.parse(saveData);

      if (saveDataObj['lines'].length > 0 && 
          (saveDataObj['width'] != canvasWidth || 
           saveDataObj['height'] != canvasHeight)) {
        console.log(saveDataObj);
        setCanvasWidth(saveDataObj['width']);
        setCanvasHeight(saveDataObj['height']);
        return;
      }

      if (loadSaveData && inputRef) {
        inputRef.loadSaveData(saveData, true);
        setLoadSaveData(false);
        sendCanvasImages();
      }
    } catch (err) {
      console.log(err);
      return;
    }
  }

  useEffect(() => {
    async function loadAsync() {
      setTimeout(loadCanvas, 100);
    }

    if (now() - lastDrag <= 20) {
      return;
    }

    loadAsync();
  }, [inputRef, saveData, lastDrag, canvasWidth, canvasHeight]);

  useEffect(() => {
    const container = document.querySelector(".canvas-draw-resize-btn");

    function touchEnd(e: any) {
      container.removeEventListener("touchmove", touchMove);
    }

    function touchMove(e: any) {
      // For some reason can't use useState here... doesn't work properly
      if (now() - mobileLastDrag > 10) {
        mobileLastDrag = now()
        if (e.touches[0].clientX !== 0 && e.touches[0].clientY !== 0) {
          const boundingRect = document
            .querySelector(`#canvas-draw-container-${id}`)
            .getBoundingClientRect();
          setCanvasWidth(max(e.touches[0].clientX - boundingRect.left, initialWidth));
          setCanvasHeight(max(e.touches[0].clientY - boundingRect.top, initialHeight));
        }
      }
    }

    function touchStart(e: any) {
      console.log("START");
      console.log(e.touches[0].clientX);
      console.log(e.touches[0].clientY);
      container.addEventListener("touchmove", touchMove);
    }

    container.addEventListener("touchstart", touchStart);
    container.addEventListener("touchend", touchEnd);

    return () => {
      container.removeEventListener("touchstart", touchStart);
      container.removeEventListener("touchend", touchEnd);
    };
  });

  return (
    <>
      <div
        id={id}
        className="canvas-draw-outermost"
        style={{
          width: String(canvasWidth),
          height: String(canvasHeight),
          visibility: hidden ? "hidden" : "visible",
        }}
      >
        <div
          className="canvas-draw-container"
          id={`canvas-draw-container-${id}`}
          onMouseUp={dispatchCanvasState}
          onPointerUp={dispatchCanvasState}
        >
          <CanvasDraw
            ref={(canvasDraw: any) => setInputRef(canvasDraw)}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            hideGrid={true}
            lazyRadius={0}
            brushRadius={brushRadius}
            brushColor={brushColor}
            catenaryColor={catenaryColor}
          />
        </div>

        <div className="canvas-draw-colors">
          <div
            className="canvas-draw-btn"
            style={{ backgroundColor: CANVAS_BLACK }}
            onClick={() => changeColor(CANVAS_BLACK)}
          ></div>
          <div
            className="canvas-draw-btn"
            style={{ backgroundColor: CANVAS_RED }}
            onClick={() => changeColor(CANVAS_RED)}
          ></div>
          <div
            className="canvas-draw-btn"
            style={{ backgroundColor: CANVAS_GREEN }}
            onClick={() => changeColor(CANVAS_GREEN)}
          ></div>
          <div
            className="canvas-draw-btn"
            style={{ backgroundColor: CANVAS_BLUE }}
            onClick={() => changeColor(CANVAS_BLUE)}
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
            style={{
              backgroundColor: !isErasing ? CANVAS_DARK_RED : CANVAS_RED,
            }}
          >
            <FontAwesomeIcon icon="eraser" size="1x" />
          </div>
        </div>
      </div>
    </>
  );
};
