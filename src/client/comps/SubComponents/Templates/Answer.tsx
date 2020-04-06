/**
 * This section is currently unused in the implementation. An answer is a dropdown
 * box underneith a "Question" component that lets the user reorder the 
 * "Answer" components. In this case the Answers represent individual
 * subsections of a PatientProfilePage (Demographics, CCHPI, etc.).
 */

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
  allQuestions: Question[];
}

export const Answers: React.FC<AnswerProps> = ({
  question,
  questionNum,
  isShowing,
  setQuestions,
  allQuestions,
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
                      <AnswerRow
                        name={answer.name}
                        visible={answer.value}
                        allQuestions={allQuestions}
                        setQuestions={setQuestions}
                        question={question}
                      />
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
