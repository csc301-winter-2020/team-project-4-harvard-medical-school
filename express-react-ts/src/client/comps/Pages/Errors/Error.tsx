import React from 'react'

interface ErrorProps {
  errNo: number
}

export const Error: React.FC<ErrorProps> = ({errNo}) => {
    return (
      <div className="app-error-page">
        <h1>{errNo} Error</h1>
        <a href="/">Click to return to home</a>
      </div>
    );
}