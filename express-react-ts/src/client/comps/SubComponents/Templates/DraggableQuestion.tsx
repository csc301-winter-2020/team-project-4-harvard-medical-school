import React, { useState, useEffect } from "react";
import { Draggable, DragDropContext } from "react-beautiful-dnd";
import { nameToUrl, getItemStyle } from "../../../utils/utils";
import { Answers } from "./Answer";
import { Question } from "./Questions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dummyTemplates } from "../../../utils/dummyTemplates";

interface DraggableQuestionProps {
  question: Question;
  index: number;
  changeFlag: boolean;
}

export const DraggableQuestion: React.FC<DraggableQuestionProps> = ({
  question,
  index,
  changeFlag,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setIsShowing(false);
  }, [changeFlag]);

  return (
    <>
      <Draggable key={question.id} draggableId={question.id} index={index}>
        {(provided, snapshot) => (
          <div
            id={`${nameToUrl[question.content]}-draggable`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={getItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
            {...provided.dragHandleProps}
          >
            <span className="draggable-check">
              <input
                type="checkbox"
                name={nameToUrl[question.content]}
                checked={!disabled}
                onChange={() => {
                  setDisabled(!disabled);
                }}
              />
            </span>
            {question.content}

            <span
              className="chevron-style"
              onClick={() => setIsShowing(!isShowing)}
            >
              {!isShowing ? (
                <FontAwesomeIcon icon="chevron-down" />
              ) : (
                <FontAwesomeIcon icon="chevron-up" />
              )}
            </span>
            <Answers
              questionNum={index}
              question={question}
              isShowing={isShowing}
            />
          </div>
        )}
      </Draggable>
    </>
  );
};
