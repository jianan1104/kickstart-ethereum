import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';


const instance =  new web3.eth.Contract(
    JSON.parse(JSON.stringify(CampaignFactory.abi)),
    '0xc8711B481be02dbF56ad7d5cF9b29854ba4B2518'
);

export default instance;