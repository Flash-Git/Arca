import React, { useContext, useEffect, useState } from "react";

import Web3Context from "../../context/web3/Web3Context";

const Loader = () => {
  const web3Context = useContext(Web3Context);
  const { web3, ArcaCalls, ErcCalls } = web3Context;

  const [loadArray, setloadArray] = useState([]);

  useEffect(() => {
    if (web3 === null) return;
    //Fill trade box with web3 calls
  }, [web3]);

  return <button className="btn">Reload box</button>;
};

export default Loader;
