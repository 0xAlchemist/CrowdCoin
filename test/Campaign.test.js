const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider();
const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
};
const web3 = new Web3(provider, null, OPTIONS);

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

describe('Campaigns', function() {
  this.timeout(7500);
  before(async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
      .deploy({ data: compiledFactory.bytecode })
      .send({ from: accounts[0], gas: '5000000' });

    await factory.methods.createCampaign('Test', '100').send({
     from: accounts[0],
     gas: '5000000'
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(
      JSON.parse(compiledCampaign.interface),
      campaignAddress
    );
  });
	it('Deploys a factory and a campaign', () => {
		assert.ok(factory.options.address);
		assert.ok(campaign.options.address);
	});
  it('Marks caller as campaign manager', async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });
  it('Allows people to contribute money and marks them as approvers once', async () => {
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200'
    });
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: '200'
    });
    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    const approversCount = await campaign.methods.approversCount().call();
    assert(isContributor);
    assert.equal(1, approversCount);
  });
  it('Requires a minimum contribution', async () => {
    try {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: '5'
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });
  it('Allows a manager to make a payment request', async () => {
    await campaign.methods
      .createRequest('Buy batteries', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({
        from: accounts[0],
        gas: '1000000'
      });
    const request = await campaign.methods.requests(0).call();
    assert.equal('Buy batteries', request.description);
  });

  it('Processes requests', async () => {
    // Get starting account balance
    let startBalance = await web3.eth.getBalance(accounts[1]);
    startBalance = web3.utils.fromWei(startBalance, 'ether');
    startBalance = parseFloat(startBalance);

    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods.contribute().send({
      from: accounts[2],
      value: web3.utils.toWei('10', 'ether')
    });

    await campaign.methods
      .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
      .send({ from: accounts[0] , gas: '1000000'});

    await campaign.methods.approveRequest(1).send({
      from: accounts[0],
      gas: '1000000'
    });

    await campaign.methods.approveRequest(1).send({
      from: accounts[2],
      gas: '1000000'
    });

    await campaign.methods.finalizeRequest(1).send({
      from: accounts[0],
      gas: '1000000'
    });

    // Get balance after approved request
    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, 'ether');
    balance = parseFloat(balance);

    assert(balance > startBalance);
  });
});