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
  initChecked: boolean;
  highlight: string;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  allQuestions: Question[];
}

export const DraggableQuestion: React.FC<DraggableQuestionProps> = ({
  question,
  index,
  changeFlag,
  initChecked,
  highlight,
  setQuestions,
  allQuestions,
  
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const [disabled, setDisabled] = useState(!initChecked);

  // useEffect(() => {
  //   setIsShowing(false);
  // }, [changeFlag]);

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
              provided.draggableProps.style,
              highlight === nameToUrl[question.content]
            )}
            {...provided.dragHandleProps}
          >
            <span className="draggable-check">
              <input
                type="checkbox"
                name={nameToUrl[question.content]}
                checked={!disabled}
                onChange={() => {
                  const questionsCopy: Question[] = JSON.parse(JSON.stringify(allQuestions));
                  for (let i = 0; i < questionsCopy.length; i++){
                    if (questionsCopy[i].content === question.content){
                      questionsCopy[i].visible = !questionsCopy[i].visible;
                      break;
                    }
                  }
                  setQuestions(questionsCopy);
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
              setQuestions={setQuestions}
            />
          </div>
        )}
      </Draggable>
    </>
  );
};
