import React, { useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import "../../scss/canvas-draw.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CanvasCompProps {
  initialHeight: number;
  initialWidth: number;
  id: string;
}

function max(a:number, b:number):number{
  if (a < b){
    return b;
  }
  return a;
}

export const CanvasComp: React.FC<CanvasCompProps> = ({initialHeight, initialWidth, id}) => {
  const [canvasHeight, setCanvasHeight] = useState(initialHeight);
  const [canvasWidth, setCanvasWidth] = useState(initialWidth);
  let boundingRect:any = null;
  useEffect(() => {
    window.addEventListener("keydown", handleUndo);
    boundingRect = document.querySelector(".canvas-draw-container").getBoundingClientRect();
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

  function dragStart(event:any) {
    console.log(`STARTED DRAG`);
  }

  function dragging(event:any) {
    setCanvasWidth(max(event.clientX - boundingRect.left, 200));
    setCanvasHeight(max(event.clientY - boundingRect.top, 140));
  }

  function drop(event:any) {
    event.preventDefault();
    setCanvasWidth(max(event.clientX - boundingRect.left, 200));
    setCanvasHeight(max(event.clientY - boundingRect.top, 140));
  }

  return (
    <>
      <div id={id} className="canvas-draw-outermost" style={{width: String(canvasWidth), height: String(canvasHeight)}}>
        <div className="canvas-draw-container">
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
          onDragStart={dragStart}
          onDrag={dragging}
          onDragEnd={drop}
          draggable
        >
          <FontAwesomeIcon icon="expand-arrows-alt" />
        </div>
        <div className="canvas-draw-btn-group">
          <div className="canvas-draw-btn" onClick={clearCanvas}>
            <FontAwesomeIcon icon="trash" />
          </div>
          <div className="canvas-draw-btn" onClick={saveCanvas}>
            <FontAwesomeIcon icon="save" />
          </div>
          <div className="canvas-draw-btn" onClick={undoCanvas}>
            <FontAwesomeIcon icon="undo" />
          </div>
        </div>
      </div>
    </>
  );
};
