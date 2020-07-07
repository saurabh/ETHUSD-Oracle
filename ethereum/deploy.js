require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const oracleObject = require('./build/Oracle.json');

const provider = new HDWalletProvider(
  `${process.env.MNEMONIC}`,
  `https://rinkeby.infura.io/v3/${process.env.INFURA_ID}`
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(`Deploying from ${accounts[0]}`);

  const txn = await new web3.eth.Contract(oracleObject.abi)
    .deploy({ data: '0x' + oracleObject.evm.bytecode.object }) // add 0x bytecode
    .send({ from: accounts[0] }); // remove 'gas'

  console.log('Contract deployed to: ', txn.options.address); // Deployed to 0xF13C14692A4774e59C2bdCAA46FE63Ca1437CDc0 on rinkeby
};

deploy();
