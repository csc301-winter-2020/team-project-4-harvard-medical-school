import React, { useEffect, useReducer, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { IndividualPatientProfile } from "./PatientProfilePage";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../scss/patient-profiles/lab-results.scss";

import { defaultLabResults } from "../../../utils/defaultLabResults";

import { toast } from "react-toastify";

import { Dropdown } from "semantic-ui-react";

interface LabResultsState {
  data: {
    [key: string]: any;
  };
}

const labResultOptions = Object.entries(defaultLabResults).map(lr => {
  return {
    key: lr[0],
    text: lr[0],
    value: lr[0],
  };
});

const initialState: LabResultsState = {
  data: JSON.parse(JSON.stringify(defaultLabResults)),
};

function reducer(
  state: LabResultsState,
  action: {
    type: string;
    fieldName?: string;
    value: any;
    newState?: { [key: string]: string | boolean | number | null };
  }
): LabResultsState {
  let newState: LabResultsState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "addEntry":
      newState.data[action.value[0]] = {
        value: action.value[1],
        added: true,
      };
      break;
    case "full_load":
      newState = action.value;
      break;
    default:
      throw new Error("Invalid type on action.");
  }
  return newState;
}

async function getLabResults(patientID: number) {
  const res = await fetch(`/api/labResults/${patientID}`, { method: "GET" });
  return await res.json();
}

async function postLabResultsInfo(patientID: number, data: LabResultsState) {
  const spec = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(`/api/labResults/${patientID}`, spec);
  return res;
}

export const LabResultsPage: IndividualPatientProfile = ({
  pageName,
  currentPage,
  setCurrentPage,
  transitionDuration,
  transitionName,
  isShowingSidebar,
  patientID,
  defaultMode,
  userType,
  templateId,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [lastState, setLastState] = useState(state);

  const mToast: any = toast;

  const postToDB = (state: LabResultsState) => {
    postLabResultsInfo(patientID, state)
      .then(data => {
        console.log(data);
        mToast.success("Information saved");
      })
      .catch(err => {
        mToast.error("Information could not be saved");
      });
  };

  useEffect(() => {
    if (lastState === initialState) {
      setLastState(state);
      return;
    }

    const timer = setTimeout(() => {
      if (
        userType === "Student" &&
        currentPage == pageName &&
        state &&
        state !== lastState
      ) {
        console.log(lastState);
        console.log(state);

        postLabResultsInfo(patientID, state)
          .then(data => {
            console.log(data);
            mToast.success("Autosaved.", {
              autoClose: 1000,
            });
          })
          .catch(err => {
            mToast.warn("Autosave failed.");
          });

        setLastState(state);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [state, lastState]);

  const history = useHistory();
  useEffect(() => {
    if (currentPage === pageName) {
      document.title = `Patient Profile: ${pageName}`;
      history.push(`/patient/${patientID}/lab`);
    }

    getLabResults(patientID)
      .then(data => {
        dispatch({ type: "full_load", value: data });
        console.log("get data");
        console.log(state.data);
      })
      .catch(err => {
        console.log("could not get Lab Results data from database");
      });
  }, [currentPage]);

  let nameInput = "";
  let valueInput = "";

  return (
    <>
      <CSSTransition
        in={currentPage === pageName}
        unmountOnExit
        timeout={transitionDuration}
        onEnter={() => setCurrentPage(pageName)}
        classNames={transitionName}
      >
        <div className="lab-results-page-outermost-container patient-profile-window">
          <div className="patient-profile-page-title">
            <h1>{pageName}</h1>
            <div id="lab-result-table-div">
              <table id="labResultsTable" className="lab-results-table">
                <thead>
                  <tr>
                    <td>Test</td>
                    <td>Value</td>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(state.data)
                    .filter(entry => entry[1]["added"])
                    .map(row => {
                      const rowClass = "";
                      return (
                        <tr className={`${rowClass}`} key={row[0]}>
                          <td>{row[0]}</td>
                          <td>{row[1]["value"]}</td>
                        </tr>
                      );
                    })}
                  <tr key="addInputs">
                    <td>
                      <div className="new-lab-result-input">
                        <div id="dropdown-container">
                          <Dropdown
                            placeholder="Select Lab Result"
                            search
                            fluid
                            selection
                            options={labResultOptions}
                            onChange={(e: any) => {
                              if (
                                e.target.classList.contains(
                                  "active selected item"
                                )
                              ) {
                                nameInput = e.target.querySelector(".text")
                                  .textContent;
                              } else {
                                nameInput = e.target.textContent;
                              }
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="new-lab-result-input">
                        <input
                          type="text"
                          id="valueInput"
                          placeholder="New Lab Result Value"
                          onChange={(e: any) => {
                            valueInput = e.target.value;
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              className="lab-results-add-value-button"
              onClick={() => {
                if (nameInput in defaultLabResults && valueInput != "") {
                  console.log(
                    "added lab result " +
                      nameInput +
                      " with value " +
                      valueInput
                  );
                  dispatch({
                    type: "addEntry",
                    value: [nameInput, valueInput],
                  });
                  // clear input
                  (document.getElementById(
                    "valueInput"
                  ) as HTMLInputElement).value = "";
                } else {
                  mToast.warn("Invalid Lab Result");
                  return;
                }
              }}
            >
              Add Lab Result
            </button>
          </div>
          {userType === "Student" && (
            <div className="patient-profile-nav-btns">
              <div
                className="nav-btn"
                style={{
                  right: "20px",
                  top: "70px",
                  position: "fixed",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  postToDB(state);
                }}
              >
                <FontAwesomeIcon icon="save" size="2x" />
              </div>
            </div>
          )}
        </div>
      </CSSTransition>
    </>
  );
};
