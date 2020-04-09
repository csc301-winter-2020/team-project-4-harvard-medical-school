/**
 * This is the page that lets admins view the different isabel outputs for
 * the different times that the user took the note at.
 */

import React, { useState, useEffect } from "react";
import { Header } from "../../SubComponents/Header";
import { ToastContainer, toast } from "react-toastify";
import { HelixLoader } from "../../SubComponents/HelixLoader";
import { max } from "../../../utils/utils";
import { Analysis } from "../../../utils/types";
import { AdminAnalysisRow } from "../../SubComponents/Admin/AdminAnalysisRow";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LeftSideBackButton } from "../../SubComponents/Home/LeftSideBackButton";


interface AdminAnalysisPageProps {
  profileID: number;
}

export const AdminAnalysisPage: React.FC<AdminAnalysisPageProps> = ({
  profileID,
}) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [analysis, setAnalysis] = useState<Analysis[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const history = useHistory();

  useEffect(() => {
    document.title = "Scribe: Analysis Deltas";
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    fetch(`/api/analysisAll/${profileID}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("No analysis for this profile.");
        }
      })
      .then((data: any[]) => {
        console.log(data);
        const newData : Analysis[] = []
        data.forEach(d => {
          newData.push({
            isabel_result:d.isbell_result,
            profile_id:d.profile_id,
            student_input:d.student_input,
            time_submitted:d.time_submitted,
          });
        });
        setAnalysis(newData);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Header
        placeholder={""}
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={false}
      />
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      {isLoading && <HelixLoader message="Loading Analysis Deltas..." />}
      <div className="home-page-content-container">
        <div className="home-page-your-patients-title">Analysis Deltas</div>
        <div className="home-page-separator-line"></div>
        <div className="home-page-content">
          {analysis.length === 0 && (
            <p style={{ marginLeft: "10px" }}>
              This patient profile does not seem to have any analysis.
            </p>
          )}
          {analysis.map((a, index: number) => {
            return (
              <AdminAnalysisRow
                key={index}
                profile_id={a.profile_id}
                student_input={a.student_input}
                isabel_result={a.isabel_result}
                time_submitted={a.time_submitted}
                isPortraitMode={windowWidth < 1080}
              />
            );
          })}
          <div
            className="home-page-content-whitespace"
            style={{ height: max(window.innerHeight - 400, 0) }}
          >
            <div className="home-page-content-whitespace-logo"></div>
          </div>
        </div>
      </div>
      <LeftSideBackButton/>
    </>
  );
};
