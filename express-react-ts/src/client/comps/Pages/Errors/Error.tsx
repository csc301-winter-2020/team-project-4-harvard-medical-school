import React from "react";
import { useHistory, RouteComponentProps } from "react-router";

interface ErrorProps extends RouteComponentProps {
  errNo?: number;
  num?: number;
  msg?: string;
  urlErr: boolean;
}

export const Error: React.FC<ErrorProps> = (props) => {
  const myProps: any = props;
  const {errNo, urlErr} = props;
  const num = myProps.match.params.num;
  const msg = myProps.match.params.msg;
  const history = useHistory();
  return (
    <div
      className="app-error-page"
      onClick={() => {
        history.goBack();
      }}
    >
      <div className="error-page-content">
        {urlErr ? <h1>{num} Error</h1> : <h1>{errNo} Error</h1>}
        <p>{msg}</p>
        <p>Click anywhere to return.</p>
      </div>
    </div>
  );
};
