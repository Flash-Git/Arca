import React, { Fragment, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

const EnsForm = ({ item }) => {
  const [ensItem, setEnsItem] = useState({
    name: "",
    namehash: "",
    id: item.id,
    verified: false
  });

  const { name, namehash, id, verified } = ensItem;

  useEffect(() => {}, []);

  //Input
  const onChange = e => {
    setEnsItem({ ...ensItem, [e.target.name]: e.target.value });
    //name => namehash => id
    //if ids match then verify
  };

  //Render
  return (
    <Fragment>
      <h3 className="item-text-1">ENS</h3>
      <form className="item-input">
        <input
          style={{ minWidth: "1rem" }}
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
        />
      </form>
      <span className="item-text-1">{verified && "ICON"}</span>
    </Fragment>
  );
};

EnsForm.propTypes = {
  item: PropTypes.object.isRequired
};

export default EnsForm;
