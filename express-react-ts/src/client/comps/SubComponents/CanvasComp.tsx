import React, { useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import "../../scss/canvas-draw.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CanvasCompProps {
  initialHeight: number;
  initialWidth: number;
  id: string;
}

function max(a: number, b: number): number {
  if (a < b) {
    return b;
  }
  return a;
}

export const CanvasComp: React.FC<CanvasCompProps> = ({
  initialHeight,
  initialWidth,
  id,
}) => {
  const [canvasHeight, setCanvasHeight] = useState(initialHeight);
  const [canvasWidth, setCanvasWidth] = useState(initialWidth);
  const [lastDrag, setLastDrag] = useState((new Date()).getTime());
  

  useEffect(() => {
    window.addEventListener("keydown", handleUndo);
    
    return () => {
      window.removeEventListener("keydown", handleUndo);
    };
  });

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

  function undoCanvas() {
    inputRef.undo();
  }

  function handleUndo(event: KeyboardEvent) {
    // Listens to ctrl+z
    if (event.ctrlKey && event.keyCode === 90) {
      inputRef.undo();
    }
  }

  function dragging(event: any) {
    if ((new Date()).getTime() - lastDrag > 10){
      setLastDrag((new Date()).getTime());
      if (event.clientX !== 0 && event.clientY !== 0) {
        const boundingRect = document.querySelector(
          `#canvas-draw-container-${id}`
        ).getBoundingClientRect();
        setCanvasWidth(max(event.clientX - boundingRect.left, initialWidth));
        setCanvasHeight(max(event.clientY - boundingRect.top, initialHeight));
      }
    }
  }

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
        >
          <CanvasDraw
            ref={(canvasDraw: any) => (inputRef = canvasDraw)}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            lazyRadius={0}
            brushRadius={3}
          />
        </div>
        <div
          className="canvas-draw-resize-btn"
          onDrag={dragging}
          draggable
        >
          <FontAwesomeIcon icon="expand-arrows-alt" size="1x" />
        </div>
        <div className="canvas-draw-btn-group">
          <div className="canvas-draw-btn" onClick={clearCanvas}>
            <FontAwesomeIcon icon="trash" size="1x" />
          </div>
          <div className="canvas-draw-btn" onClick={saveCanvas}>
            <FontAwesomeIcon icon="save" size="1x" />
          </div>
          <div className="canvas-draw-btn" onClick={undoCanvas}>
            <FontAwesomeIcon icon="undo" size="1x" />
          </div>
        </div>
      </div>
    </>
  );
};
