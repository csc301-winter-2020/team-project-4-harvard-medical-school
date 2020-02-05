import React from "react";
import { ExampleComp } from "../SubComponents/ExampleComp";

interface PageProps {}

export const Page: React.FC<PageProps> = ({}) => {
  return (
    <div className="my-class">
      Page
      <ExampleComp age={4} name="Jim" />
      <ExampleComp age={123} name="Joe" myBool={true} />
    </div>
  );
};
