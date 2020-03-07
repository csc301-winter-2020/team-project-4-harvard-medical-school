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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dummyTemplates, defaultTemplate } from "../../../utils/dummyTemplates";
import { TemplateAssignment } from "../../Pages/TemplatesPage";
import { Header } from "../Header";
import { contentType } from "../../../utils/types";
import { DraggableQuestion } from "./DraggableQuestion";
import { RouteComponentProps } from "react-router";

export type Question = {
  id: string;
  content: contentType;
  answers: answer[];
  visible: boolean;
};

function getFields(fields: TemplateAssignment[]): answer[] {
  const res: answer[] = [];
  for (let i: number = 0; i < fields.length; i++) {
    res.push({ title: fields[i].name, visible: fields[i].value });
  }
  return res;
}

type answer = {
  title: string;
  visible: boolean;
};

const getQuestions = (useDefault: boolean, templateID: number): Question[] => {
  const count: number = 10;
  if (useDefault) {
    return Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `question-${k}`,
      content: defaultTemplate.template[k].title,
      answers: getFields(defaultTemplate.template[k].fields),
      visible: true,
    }));
  } else {
    return Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `question-${k}`,
      content: dummyTemplates[templateID].template[k].title,
      answers: getFields(dummyTemplates[templateID].template[k].fields),
      visible: dummyTemplates[templateID].template[k].visible,
    }));
  }
};

interface QuestionCompProps extends RouteComponentProps {
  useDefault: boolean;
  id?: string;
}

export const Questions: React.FC<QuestionCompProps> = (
  props: QuestionCompProps
) => {
  const myProps: any = props;
  const templateID: number = Number(myProps.match.params.id);
  const { useDefault } = props;
  const [questions, setQuestions] = useState<Question[]>(
    getQuestions(useDefault, templateID)
  );

  function onDragStart(result: DropResult, provided: ResponderProvided) {
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
      const answers: answer[] = reorder(
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
  const [highlight, setHighlight] = useState<string | null>(null);
  const [title, setTitle] = useState(
    useDefault
      ? defaultTemplate.template_name
      : dummyTemplates[templateID].template_name
  );
  const [editingTitle, setEditingTitle] = useState(false);

  useEffect(() => {
    const lower: string = searchVal.toLowerCase();
    if (lower === "") {
      setHighlight(null);
    } else if ("demographics".includes(lower)) {
      scrollIntoView("demographics");
      setHighlight("demographics");
    } else if ("social history".includes(lower)) {
      scrollIntoView("social");
      setHighlight("social");
    } else if ("family history".includes(lower)) {
      scrollIntoView("family");
      setHighlight("family");
    } else if ("past medical history".includes(lower)) {
      scrollIntoView("pastmedical");
      setHighlight("pastmedical");
    } else if ("imaging results".includes(lower)) {
      scrollIntoView("imaging");
      setHighlight("imaging");
    } else if ("assessment and plan".includes(lower)) {
      scrollIntoView("assessment");
      setHighlight("assessment");
    } else if (
      "chief complaint and history of present illness".includes(lower) ||
      "cchpi".includes(lower)
    ) {
      scrollIntoView("cchpi");
      setHighlight("cchpi");
    } else if ("lab results".includes(lower)) {
      scrollIntoView("lab");
      setHighlight("lab");
    } else if ("review of systems".includes(lower)) {
      scrollIntoView("reviewofsystems");
      setHighlight("reviewofsystems");
    } else if ("physical examination".includes(lower)) {
      scrollIntoView("physical");
      setHighlight("physical");
    } else {
      setHighlight(null);
    }
  }, [searchVal]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

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
        <div
          className="templates-main-container"
          style={{ overflowY: "scroll" }}
        >
          <span
            onClick={() => setEditingTitle(!editingTitle)}
            className="template-editTitleBtn"
          >
            {editingTitle && <FontAwesomeIcon icon="check" size="2x" />}
            {!editingTitle && <FontAwesomeIcon icon="pencil-alt" size="2x" />}
          </span>
          <span className="templates-title">
            {editingTitle ? (
              <>
                <input
                  type="text"
                  value={title}
                  maxLength={20}
                  style={{
                    fontSize: "3rem",
                    width: "800px",
                    outline: "none",
                    marginBottom: "16px",
                    marginLeft: "10px",
                  }}
                  onChange={(e: any) => {
                    setTitle(e.target.value);
                  }}
                />
                <span>{`${title.length}/20`}</span>
              </>
            ) : (
              <h1>{title}</h1>
            )}
          </span>

          <div className="home-page-separator-line"></div>
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <Droppable droppableId="droppable" type="QUESTIONS">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getQuestionListStyle(snapshot.isDraggingOver)}
                >
                  {questions.map((question: Question, index: number) => (
                    <DraggableQuestion
                      question={question}
                      index={index}
                      key={index}
                      changeFlag={changeFlag}
                      initChecked={question.visible}
                      highlight={highlight}
                      setQuestions={setQuestions}
                      allQuestions={questions}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <div className="question-floating-save-btn">
        <FontAwesomeIcon icon="save" size="2x" />
      </div>
    </>
  );
};
