const enable = () => {
  if (window.ethereum === null) return false;
  return new Promise((resolve, reject) => {
    window.ethereum
      .enable()
      .then(addresses => {
        console.log("Enabled");
        window.ethereum.autoRefreshOnNetworkChange = false; //TODO handle in state
        resolve(true);
      })
      .catch(e => {
        resolve(false);
      });
  });
};

export default enable;
