const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  // this is a test mnemonic
  'path egg project cross gown grape local material honey seminar sunset sand',
  'https://rinkeby.infura.io/v3/86641bab20c74108ba0b6101fb7cb9f8'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  console.log('attempting to deploy from ',accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy( {data: bytecode, arguments: ['Hello there!']} )
    .send( {gas: 1000000, from: accounts[0]} )

  console.log('contract deployed to ', result.options.address);
  provider.engine.stop();
} 
deploy()