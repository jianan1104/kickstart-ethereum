import Web3 from "web3";

const provider = new Web3.providers.HttpProvider(
  "https://rinkeby.infura.io/v3/72f035603d5e4be7a8a4d068198e411e"
);
let web3 = new Web3(provider);



export default web3;