import React, { FC, Fragment, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AlertContext from "../../context/alert/AlertContext";

import { AlertContext as IAlertContext } from "context";

const Alerts: FC = () => {
  const alertContext: IAlertContext = useContext(AlertContext);

  if (alertContext.alerts.length === 0) return null;

  return (
    <Fragment>
      {alertContext.alerts.map(alert => (
        <div className={`alert alert-${alert.type}`}>
          <FontAwesomeIcon icon={["fa", "info-circle"]} />
          {alert.msg}
        </div>
      ))}
    </Fragment>
  );
};

export default Alerts;
