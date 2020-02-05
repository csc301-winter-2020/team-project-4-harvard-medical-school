import React from "react";

interface ExampleCompProps {
  name: string;
  myBool?: boolean;
  age: number;
}

export const ExampleComp: React.FC<ExampleCompProps> = ({
  name,
  myBool,
  age,
}) => {
  return (
    <div>
      My name is {name}, my age is {age}.
      {myBool ? (
        <div>You included the bool</div>
      ) : (
        <div>You did not include the bool</div>
      )}
    </div>
  );
};
