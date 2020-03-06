import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { nameToUrl, getItemStyle } from "../../../utils/utils";
import { Answers } from "./Answer";
import { Question } from "./Questions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DraggableQuestionProps {
  question: Question;
  index: number;
}

export const DraggableQuestion: React.FC<DraggableQuestionProps> = ({
  question,
  index,
}) => {
  const [isShowing, setIsShowing] = useState(false);
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
            {question.content}

            <span
              style={{
                position: "absolute",
                right: "75px",
                cursor: "pointer",
                zIndex: 100,
              }}
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
