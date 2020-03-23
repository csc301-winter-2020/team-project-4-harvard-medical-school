import React, { useState, useEffect } from "react";
import { Header } from "../../SubComponents/Header";
import { ToastContainer, toast } from "react-toastify";
import { HelixLoader } from "../../SubComponents/HelixLoader";
import { max } from "../../../utils/utils";
import { Analysis } from "../../../utils/types";

interface AdminAnalysisPageProps {
  profileID: number;
}

export const AdminAnalysisPage: React.FC<AdminAnalysisPageProps> = ({
  profileID,
}) => {
  const [isAvatarPopup, setIsAvatarPopup] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis[]>([]);

  useEffect(() => {
    fetch(`/api/analysisAll/${profileID}`)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("No analysis for this profile.");
        }
      })
      .then((data: Analysis[]) => {
        console.log(data);
        setAnalysis(data);
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Header
        placeholder={"Search Patients"}
        isAvatarPopup={isAvatarPopup}
        setIsAvatarPopup={setIsAvatarPopup}
        showSearch={true}
        searchValue={searchVal}
        setSearchValue={setSearchVal}
      />
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      {isLoading && <HelixLoader message="Loading Patients..." />}
      <div className="home-page-content-container">
        <div className="home-page-your-patients-title">Analysis Deltas</div>
        <div className="home-page-separator-line"></div>
        <div className="home-page-content">
          {analysis.length === 0 && (
            <p style={{marginLeft: "10px"}}>This patient profile does not seem to have any analysis.</p>
          )}
          {analysis.map((a, index: number) => {
            return <div key={index}>{a.time_submitted}</div>;
          })}
          <div
            className="home-page-content-whitespace"
            style={{ height: max(window.innerHeight - 400, 0) }}
          >
            <div className="home-page-content-whitespace-logo"></div>
          </div>
        </div>
      </div>
    </>
  );
};
