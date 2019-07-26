import React, { useContext, useState } from "react";

import TradeContext from "../../context/trade/TradeContext";

const ItemForm = () => {
  const tradeContext = useContext(TradeContext);

  const { addTradeItem } = tradeContext;

  const [item, setItem] = useState({
    contractAdd: "",
    type: "",
    id: "" //id/amount
  });

  const { contractAdd, type, id } = item;

  //Input
  const onChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    addTradeItem(item);
  };

  //Render
  return (
    <form onSubmit={onSubmit} className="my-2">
      <input
        type="text"
        placeholder="Contract Address"
        name="contractAdd"
        value={contractAdd}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="type"
        name="type"
        value={type}
        onChange={onChange}
      />
      <input
        // TODO conditional
        type="id"
        placeholder="id"
        name="id"
        value={id}
        onChange={onChange}
      />
      <input
        type="submit"
        value="Add Trade"
        className="btn btn-dark btn-block"
      />
    </form>
  );
};

export default ItemForm;
