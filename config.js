require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const oracleObject = require('./ethereum/build/Oracle.json');
const address = '0xF13C14692A4774e59C2bdCAA46FE63Ca1437CDc0';

const provider = new HDWalletProvider(
  `${process.env.MNEMONIC}`,
  `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`
);

const web3 = new Web3(provider);

module.exports = {
  getAccounts: () => {
    return web3.eth.getAccounts();
  },
  oracleObjSetup: () => {
    return new web3.eth.Contract(oracleObject.abi, address)
  }
};
