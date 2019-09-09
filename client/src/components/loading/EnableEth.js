import React from "react";

const EnableEth = () => {
  export const enable = () => {
    if (window.ethereum === null) return;
    return window.ethereum.enable();
  };

  const onClick = e => {
    enable();
  };

  return <button onClick={onClick}>Connect</button>;
};

export default EnableEth;
