const { equal } = require('assert');
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider())
const {interface, bytecode} = require('../compile');

let accounts
let inbox

beforeEach(async () => {
  //get a list of all accounts
  accounts = await web3.eth.getAccounts()
  //use one of these accounts to deploy the smart contract to
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ from: accounts[0], gas: '1000000' });
})

describe('Contract', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address)
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Hi there!')
  })

  it('can update the message', async () => {
    await inbox.methods.setMessage('Bye!').send( {from: accounts[0]} )
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Bye!')
  })
});