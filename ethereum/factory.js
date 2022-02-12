import Web3 from "web3";
import CampaignFactory from './build/CampaignFactory.json';

let web3;
const infuraProvider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/72f035603d5e4be7a8a4d068198e411e"
    );

export default  (provider = infuraProvider) => {
    web3 = new Web3(provider);
    return  new web3.eth.Contract(
        JSON.parse(JSON.stringify(CampaignFactory.abi)),
        '0xc8711B481be02dbF56ad7d5cF9b29854ba4B2518'
    );
};