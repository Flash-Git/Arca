import React, { Fragment, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

import Web3Context from "../../../context/web3/Web3Context";

let offset = 0;

const EnsForm = ({ item }) => {
  const web3Context = useContext(Web3Context);

  const { ens } = web3Context;

  const [ensItem, setEnsItem] = useState({
    name: "",
    namehash: "",
    id: item.id,
    verified: false
  });

  const { name, namehash, id, verified } = ensItem;

  useEffect(() => {
    offset++;
    setTimeout(validate, 1000);
  }, [name]);

  const validate = () => {
    offset--;
    if (offset !== 0) return;
  };

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
