import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  ResponderProvided,
} from "react-beautiful-dnd";
import {
  reorder,
  getItemStyle,
  getQuestionListStyle,
} from "../../../utils/utils";
import { Answers } from "./Answer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dummyTemplates } from "../../../utils/dummyTemplates";
import { TemplateAssignment } from "../../Pages/TemplatesPage";
import { Header } from "../Header";

export type Question = {
  id: string;
  content: string;
  answers: string[];
};

function getFieldNames(fields: TemplateAssignment[]): string[] {
  const res: string[] = [];
  for (let i: number = 0; i < fields.length; i++) {
    res.push(fields[i].name);
  }
  return res;
}

const getQuestions = (count: number): Question[] =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `question-${k}`,
    content: `${dummyTemplates[0].template[k].title}`,
    answers: getFieldNames(dummyTemplates[0].template[k].fields),
  }));

export const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(getQuestions(10));

  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    // dropped outside the list
    if (!result.destination) {
      //console.log("no-change");
      return;
    }

    if (result.type === "QUESTIONS") {
      console.log(result);
      setQuestions(
        reorder(questions, result.source.index, result.destination.index)
      );
    } else {
      const answers: string[] = reorder(
        questions[parseInt(result.type, 10)].answers,
        result.source.index,
        result.destination.index
      );

      const reorderedQuestions = JSON.parse(JSON.stringify(questions));
      reorderedQuestions[result.type].answers = answers;
      setQuestions(reorderedQuestions);
    }
  }

  const [isAvatarPopup, setIsAvatarPopup] = useState(false);

  return (
    <>
      <Header
        isAvatarPopup={isAvatarPopup}
        placeholder=""
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={false}
      />
      <div className="templates-main-container">
        <div className="templates-title">
          <h1>{dummyTemplates[0].template_name}</h1>
        </div>

        <div className="home-page-separator-line"></div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable" type="QUESTIONS">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getQuestionListStyle(snapshot.isDraggingOver)}
              >
                {questions.map((question: Question, index: number) => (
                  <Draggable
                    key={question.id}
                    draggableId={question.id}
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
                        {question.content}
                        <span {...provided.dragHandleProps}>
                          <span style={{ float: "left" }}>
                            <FontAwesomeIcon icon={"grip-vertical"} />
                          </span>
                        </span>
                        <Answers questionNum={index} question={question} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};
