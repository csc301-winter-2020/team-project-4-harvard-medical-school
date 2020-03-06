import React, { useState, useEffect } from "react";
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
  nameToUrl,
  scrollIntoView,
} from "../../../utils/utils";
import { Answers } from "./Answer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dummyTemplates } from "../../../utils/dummyTemplates";
import { TemplateAssignment } from "../../Pages/TemplatesPage";
import { Header } from "../Header";
import { contentType } from "../../../utils/types";
import { DraggableQuestion } from "./DraggableQuestion";

export type Question = {
  id: string;
  content: contentType;
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
    content: dummyTemplates[0].template[k].title,
    answers: getFieldNames(dummyTemplates[0].template[k].fields),
  }));

export const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(getQuestions(10));

  function onDragStart(result: DropResult, provided: ResponderProvided){
    setChangeFlag(!changeFlag);
  }

  function onDragEnd(result: DropResult, provided: ResponderProvided) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.type === "QUESTIONS") {
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
  const [searchVal, setSearchVal] = useState("");
  const [changeFlag, setChangeFlag] = useState(false);

  useEffect(() => {
    const lower: string = searchVal.toLowerCase();
    if (lower === "") {
    } else if ("demographics".includes(lower)) {
      scrollIntoView("demographics");
    } else if ("social history".includes(lower)) {
      scrollIntoView("social");
    } else if ("family history".includes(lower)) {
      scrollIntoView("family");
    } else if ("past medical history".includes(lower)) {
      scrollIntoView("pastmedical");
    } else if ("imaging results".includes(lower)) {
      scrollIntoView("imaging");
    } else if ("assessment and plan".includes(lower)) {
      scrollIntoView("assessment");
    } else if (
      "chief complaint and history of present illness".includes(lower) ||
      "cchpi".includes(lower)
    ) {
      scrollIntoView("cchpi");
    } else if ("lab results".includes(lower)) {
      scrollIntoView("lab");
    } else if ("review of systems".includes(lower)) {
      scrollIntoView("reviewofsystems");
    } else if ("physical examination".includes(lower)) {
      scrollIntoView("physical");
    }
  }, [searchVal]);

  return (
    <>
      <Header
        isAvatarPopup={isAvatarPopup}
        placeholder="Search Template Contents"
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={true}
        searchValue={searchVal}
        setSearchValue={setSearchVal}
      />
      <div className="templates-outermost">
        <div className="templates-main-container">
          <div className="templates-title">
            <h1>{dummyTemplates[0].template_name}</h1>
          </div>

          <div className="home-page-separator-line"></div>
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Droppable droppableId="droppable" type="QUESTIONS">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getQuestionListStyle(snapshot.isDraggingOver)}
                >
                  {questions.map((question: Question, index: number) => (
                    <DraggableQuestion question={question} index={index} key={index} changeFlag={changeFlag}/>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};
