import React, { FC, useContext, useEffect } from "react";

import AppContext from "../../context/app/AppContext";

import { AppContext as IAppContext } from "context";

const About: FC = () => {
  const appContext: IAppContext = useContext(AppContext);
  const { setLocation } = appContext;

  useEffect(() => {
    setLocation("about");
  }, []);

  return (
    <div className="m-1" style={{ display: "block" }}>
      <h1>About</h1>
      <p className="my-1">Ethereum Application</p>
      <p className="bg-dark p">
        <strong>Version: </strong> 1.0.0
      </p>
    </div>
  );
};

export default About;
