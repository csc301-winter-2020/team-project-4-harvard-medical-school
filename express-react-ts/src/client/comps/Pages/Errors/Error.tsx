import React from "react";
import { useHistory } from "react-router";


interface ErrorProps {
  errNo: number;
}

export const Error: React.FC<ErrorProps> = ({ errNo }) => {
  const history = useHistory();
  return (
      <div className="app-error-page" onClick={() => {
        history.goBack();
      }}>
        <div className="error-page-content">
          <h1>{errNo} Error</h1>
          <p>Click anywhere to return.</p>
        </div>
      </div>
  );
};
