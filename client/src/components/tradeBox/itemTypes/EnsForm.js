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
    <Fragment>
      <h3 className="item-text">ENS</h3>
      <form className="item-text">
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
        />
        {verified && "ICON"}
      </form>
    </Fragment>
  );
};

EnsForm.propTypes = {
  item: PropTypes.object.isRequired
};

export default EnsForm;
