const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory');

const provider = new HDWalletProvider(
  'luggage hand just ten zoo boost beef myself exchange round leave rent',
  'https://rinkeby.infura.io/v3/72f035603d5e4be7a8a4d068198e411e'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(JSON.stringify(compiledFactory.abi)))
  .deploy({
      data: compiledFactory.evm.bytecode.object
  })
  .send({
      from: accounts[0],
      gas: '1500000'
  });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deploy();
