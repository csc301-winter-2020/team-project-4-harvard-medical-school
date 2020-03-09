import React from "react";

interface FormGroupProps {
  value: string;
  dispatch: React.Dispatch<{
    type: string;
    fieldName?: string;
    value?: string;
  }>;
  name: string;
  label: string;
  id: string;
  type: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  value,
  dispatch,
  name,
  label,
  id,
  type
}) => {
  return (
    <div className="group">
      <input
        id={id}
        name={name}
        type={type}
        required
        value={value}
        onChange={e =>
          dispatch({
            type: "field",
            fieldName: e.target.name,
            value: e.target.value
          })
        }
      ></input>
      <span className="highlight"></span>
      <span className="bar"></span>
      <label>{label}</label>
    </div>
  );
};
