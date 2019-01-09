let web3;
if(window.ethereum){ //Modern DApp Browsers
  web3 = new Web3(window.ethereum);
  try { 
    window.ethereum.enable().then(
      function() {
        console.log("Web3 Enabled");
      }
    );
  } catch(e) {
    console.log(e);
  }
} else if(window.web3){//Legacy DApp Browsers
  web3 = new Web3(web3.currentProvider);
  console.log("Legacy web3 enabled");
} else { //Non-DApp Browsers
  alert("Please install MetaMask");
}

function formJson(_name, _type, _inputs) {
  //todo validate inputs
  let innerInputs = [];
  for(let i = 0; i < _inputs.length; i++){
    innerInputs.push(addinput(_inputs[i][0], _inputs[i][1]));
  }
  
  let jsonObj = { name: _name, type: _type, inputs: innerInputs};
  return jsonObj;
}

function addinput(_type, _name) {
  const input = {
    type: "",
    name: ""
  }
  input.type = _type;
  input.name = _name;
  return input;
}

const name = "setSquish";
const funct = "function";
const inputs = [
  ["uint256", "_value"]
];

function generateEncodedCall(_name, _type, _inputs, _args){
  return web3.eth.abi.encodeFunctionCall(
    formJson(name, funct, inputs), _args
  );
}

const encodedCall = generateEncodedCall(name, funct, inputs, ["5"]);
console.log(encodedCall);

/*
web3.eth.abi.encodeFunctionCall({
  name: 'setSquish',
  type: 'function',
  inputs: [{
    type: 'uint256',
    name: '_value'
  }]
}, ['5']);
*/