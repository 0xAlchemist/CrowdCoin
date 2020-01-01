const settings = require('./settings.json');

import Web3 from 'web3';

let web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {

	const getProvider = async () => {
    await window.web3.currentProvider.enable(); // request authentication
  };
  
	getProvider();
	
	// we are in the browser and metamask is running
	web3 = new Web3(window.web3.currentProvider);
} else {
	// We are on the server *or* the user is not using metamask
	const provider = new Web3.providers.HttpProvider(
		settings.apiGateway
	);
	web3 = new Web3(provider);
}

export default web3;