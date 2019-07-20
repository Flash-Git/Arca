import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EnsForm = id => {
  const [item, setItem] = useState({
    name: "",
    namehash: "",
    id: id,
    verified: false
  });

  const { name, namehash, id, verified } = item;

  useEffect(() => {
    //eslint-disable-next-line
  }, []);

  //Input
  const onChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
    //name => namehash => id
    //if ids match then verify
  };

  //Render
  return (
    <div>
      <form>
        <h2 className="text-primary">ID:{id}</h2>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
        />
        {verified && "ICON"}
      </form>
    </div>
  );
};

EnsForm.propTypes = {
  id: PropTypes.string.isRequired
};

export default EnsForm;
