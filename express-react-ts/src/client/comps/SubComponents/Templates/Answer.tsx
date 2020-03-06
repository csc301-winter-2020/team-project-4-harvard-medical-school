import React, { Component, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getItemStyle, getAnswerListStyle } from "../../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Question } from "./Questions";

interface AnswerProps {
  question: Question;
  questionNum: number;
  isShowing: boolean;
}

export const Answers: React.FC<AnswerProps> = ({
  question,
  questionNum,
  isShowing,
}) => {
  const [disabled, setDisabled] = useState(false);

  return (

    <Droppable droppableId={`droppable${question.id}`} type={`${questionNum}`}>
      {(provided, snapshot) =>
        isShowing && (
          <div
            ref={provided.innerRef}
            style={getAnswerListStyle(snapshot.isDraggingOver)}
          >
            {question.answers.map((answer, index) => {
              return (
                <Draggable
                  key={`${questionNum}${index}`}
                  draggableId={`${questionNum}${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
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
                          name={answer}
                          checked={!disabled}
                          onChange={() => {
                            setDisabled(!disabled);
                          }}
                        />
                      </span>
                      {answer}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )
      }
    </Droppable>
  );
};
