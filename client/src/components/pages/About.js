import React, { useContext, useEffect } from "react";

import AppContext from "./../../context/app/AppContext";

const About = () => {
  const appContext = useContext(AppContext);
  const { setLocation } = appContext;

  useEffect(() => {
    setLocation("about");
    //eslint-disable-next-line
  }, []);
  return (
    <div style={{ display: "block" }}>
      <h1>About</h1>
      <p className="my-1">Ethereum Application</p>
      <p className="bg-dark p">
        <strong>Version: </strong> 1.0.0
      </p>
    </div>
  );
};

export default About;
