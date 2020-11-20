import React, { FC, useContext, useEffect } from "react";

import AppContext from "../../context/app/AppContext";

import { AppContext as IAppContext } from "context";

const NotFound: FC = () => {
  const appContext: IAppContext = useContext(AppContext);
  const { setLocation } = appContext;

  useEffect(() => {
    setLocation("notFound");
  }, []);

  return (
    <div className="m-1" style={{ display: "block" }}>
      <h1>Not Found</h1>
      <p className="lead">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
