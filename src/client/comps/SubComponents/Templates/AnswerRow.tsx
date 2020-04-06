/**
 * This represents a singular row within the "Answers" component. Each one 
 * has a name and displays whether they are enabled or not. In the current 
 * implementation of the project, this component is UNUSED.
 */

import React, { useState, useEffect } from "react";
import { Question } from "./Questions";

interface AnswerRowProps {
  name: string;
  visible: boolean;
  allQuestions: Question[];
  question: Question;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

export const AnswerRow: React.FC<AnswerRowProps> = ({
  name,
  visible,
  allQuestions,
  question,
  setQuestions,
}) => {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  });

  return (
    <>
      <span className="draggable-check">
        <label>
          <input
            type="checkbox"
            name={name}
            checked={isVisible}
            onChange={() => {
              const questionsCopy: Question[] = JSON.parse(
                JSON.stringify(allQuestions)
              );
              for (let i = 0; i < questionsCopy.length; i++) {
                if (questionsCopy[i].title === question.title) {
                  for (let j = 0; j < questionsCopy[i].fields.length; j++){
                    if (questionsCopy[i].fields[j].name === name){
                      questionsCopy[i].fields[j].value = !questionsCopy[i].fields[j].value;
                      break;
                    }
                  }
                  break;
                }
              }
              setQuestions(questionsCopy);

              setIsVisible(!isVisible);
            }}
          />
          {name}
        </label>
      </span>
    </>
  );
};
