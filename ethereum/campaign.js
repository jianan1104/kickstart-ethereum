import Web3 from "web3";
import Campaign from './build/Campaign.json';

let web3;
const infuraProvider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/72f035603d5e4be7a8a4d068198e411e"
    );

export default  (address,  provider = infuraProvider) => {
    web3 = new Web3(provider);
    return  new web3.eth.Contract(
        JSON.parse(JSON.stringify(Campaign.abi)),
        address
    );
};
