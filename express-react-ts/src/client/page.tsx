import React from 'react'
import { Comp } from "./comps/Comp";

interface pageProps {

}

export const page: React.FC<pageProps> = ({}) => {
    return (
      <div className="my-class">
        Page
        <Comp age={4} name="Jim"/>
        <Comp age={123} name="Joe" myBool={true}/>
      </div>
    );
}