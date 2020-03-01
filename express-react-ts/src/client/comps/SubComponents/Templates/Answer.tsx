import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getItemStyle, getAnswerListStyle } from "../../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Question } from "./Questions";

interface AnswerProps {
  question: Question;
  questionNum: number;
}

export const Answers: React.FC<AnswerProps> = ({ question, questionNum }) => {
  return (
    <Droppable droppableId={`droppable${question.id}`} type={`${questionNum}`}>
      {(provided, snapshot) => (
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
                  >
                    <span {...provided.dragHandleProps}>
                      <span style={{ float: "left" }}>
                        <FontAwesomeIcon icon={"grip-vertical"} />
                      </span>
                    </span>
                    {answer}
                  </div>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
