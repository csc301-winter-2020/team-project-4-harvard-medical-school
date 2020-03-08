import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { getItemStyle, getAnswerListStyle } from "../../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Question } from "./Questions";
import { AnswerRow } from "./AnswerRow";

interface AnswerProps {
  question: Question;
  questionNum: number;
  isShowing: boolean;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

export const Answers: React.FC<AnswerProps> = ({
  question,
  questionNum,
  isShowing,
  setQuestions,
}) => {

  return (
    <Droppable droppableId={`droppable${question.id}`} type={`${questionNum}`}>
      {(provided, snapshot) =>
        isShowing && (
          <div
            ref={provided.innerRef}
            style={getAnswerListStyle(snapshot.isDraggingOver)}
          >
            {question.fields.map((answer, index) => {
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
                        provided.draggableProps.style,
                        false
                      )}
                      {...provided.dragHandleProps}
                    >
                      <AnswerRow name={answer.name} visible={answer.value}/>
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
