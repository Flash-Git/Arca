import React from "react";
import PropTypes from "prop-types";

import ItemForm from "./ItemForm";
import Items from "./Items";

const Box = ({ user }) => {
  return (
    <div>
      <Items user={user} />
      {user && <ItemForm />}
    </div>
  );
};

Box.defaultProps = {
  user: false
};

Box.propTypes = {
  user: PropTypes.bool.isRequired
};

export default Box;
