import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const settings = require('./settings.json');

const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	settings.contractAddress
);

export default instance;