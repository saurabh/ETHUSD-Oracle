const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const oraclePath = path.resolve(__dirname, 'contracts', 'Oracle.sol');
const source = fs.readFileSync(oraclePath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Oracle.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

// const abiString = solc.compile(JSON.stringify(input));
// const output = JSON.parse(abiString).contracts['Campaign.sol'];
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Oracle.sol'];

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract + '.json'),
    output[contract]
  );
}

// // for (let contract in output) {
// //   console.log(output[contract].evm.bytecode.object); //Bytecode
// //   console.log(output[contract].abi); // interface
// // }
