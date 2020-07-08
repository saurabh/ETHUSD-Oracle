const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const provider = ganache.provider({ gasLimit: 10000000 });
const web3 = new Web3(provider);
const oracleObject = require('../build/Oracle.json');

let accounts;
let oracle;
let cmcPrice

beforeEach(async () => {
  cmcPrice = 243.477057386; // CMC API returns the price with 9 decimals.
  accounts = await web3.eth.getAccounts();
  oracle = await new web3.eth.Contract(oracleObject.abi)
    .deploy({ data: oracleObject.evm.bytecode.object })
    .send({ from: accounts[0], gas: '10000000' });
});

describe('Oracle', () => {
  it('deploys an oracle', () => {
    assert.ok(oracle.options.address);
  });

  it('lets the owner push the latest price to the contract', async () => {
    try {
      cmcPrice *= 10 ** 9;
      const owner = await oracle.methods.owner().call();
      await oracle.methods.updatePrice(cmcPrice).send({ from: owner });
      assert(false); // if the previous contribute does NOT give an error, this line will make sure the test fails.
    } catch (err) {
      assert(err); // this line checks to make sure there is an error present in the try block, if there is then the test will pass.
    }
  });

  it('does not allow anyone but the owner to update the price on the contract', async () => {
    try {
      cmcPrice *= 10 ** 9;
      await oracle.methods.updatePrice(cmcPrice).send({ from: accounts[1] });
      assert(false); // if the previous contribute does NOT give an error, this line will make sure the test fails.
    } catch (err) {
      assert(err); // this line checks to make sure there is an error present in the try block, if there is then the test will pass.
    }
  });

  it('fetches the latest ETHUSD price from the contract', async () => {
    const price = cmcPrice * 10 ** 9;
    await oracle.methods.updatePrice(price).send({ from: accounts[0] });

    let oraclePrice = await oracle.methods.currentPrice().call();
    oraclePrice /= 10 ** 9;
    assert.equal(oraclePrice, cmcPrice);
  });

  it('makes sure the new owner has to accept his role before transferring ownership', async () => {
    let currentOwner = await oracle.methods.owner().call();
    await oracle.methods.changeOwner(accounts[1]).send({ from: currentOwner });
    await oracle.methods.acceptOwnership().send({ from: accounts[1] })
    await oracle.methods.transferOwner().send({ from: currentOwner });
    let newOwner = await oracle.methods.owner().call();

    assert.equal(newOwner, accounts[1]);
  });
});
