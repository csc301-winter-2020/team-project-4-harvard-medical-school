import React, { useState } from "react";

interface AnswerRowProps {
  name: string;
  visible: boolean;
}

export const AnswerRow: React.FC<AnswerRowProps> = ({name, visible}) => {
  const [isVisible, setIsVisible] = useState(visible);
  
  return (
    <>
      <span className="draggable-check">
        <label>
          <input
            type="checkbox"
            name={name}
            checked={isVisible}
            onChange={() => {
              setIsVisible(!isVisible);
            }}
          />
          {name}
        </label>
      </span>
    </>
  );
};
