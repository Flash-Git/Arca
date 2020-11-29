interface Window {
  ethereum: any;
}
declare var window: Window;

const enable = () => {
  if (!window.ethereum) return false;
  return new Promise((resolve, reject) => {
    window.ethereum
      .enable()
      .then((addresses: string[]) => {
        console.log("Enabled");
        window.ethereum.autoRefreshOnNetworkChange = false; //TODO handle in state
        resolve(true);
      })
      .catch((e: any) => {
        resolve(false);
      });
  });
};

export default enable;
