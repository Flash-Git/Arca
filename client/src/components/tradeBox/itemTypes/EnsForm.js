import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import EnsContext from "../../../context/ens/EnsContext";

const EnsForm = item => {
  const ensContext = useContext(EnsContext);

  const [ensItem, setEnsItem] = useState({
    name: "",
    namehash: "",
    id: item.id,
    verified: false
  });

  const { name, namehash, id, verified } = ensItem;

  useEffect(() => {
    //eslint-disable-next-line
  }, []);

  //Input
  const onChange = e => {
    setEnsItem({ ...ensItem, [e.target.name]: e.target.value });
    //name => namehash => id
    //if ids match then verify
  };

  //Render
  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      {verified && "ICON"}
    </form>
  );
};

EnsForm.propTypes = {
  item: PropTypes.object.isRequired
};

export default EnsForm;
