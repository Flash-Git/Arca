import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AlertContext from "../../context/alert/AlertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div className={`alert alert-${alert.type}`}>
        <FontAwesomeIcon icon={["fa", "info-circle"]} />
        {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
