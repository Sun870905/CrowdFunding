import Promise from 'bluebird';
import * as fs from 'fs';
import solc from 'solc';
import Web3 from 'web3';

// Connect to a local Ethereum node over RPC.
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Create a promise from the web3.js contract instance
// in order to use other async methods on it.
const deployContractPromise = (contractName, contractInstance, params) => new Promise((resolve, reject) => {
  const deployCallback = (error, contract) => {
    if (error) {
      return reject(error);
    } else {
      if (contract.address) {
        return resolve({
          name: contractName,
          address: contract.address,
          abi: JSON.stringify(contract.abi),
          command: `var myContract = web3.eth.contract(${JSON.stringify(contract.abi)}).at("${contract.address}");`,
        });
      } else {
        console.log(`TransactionHash: ${contract.transactionHash} waiting to be mined...`);
      }
    }
  };
  const deployParams = params.concat([deployCallback]);
  contractInstance.new(...deployParams);
});

// Build an options object with contract metadata
// for web3.js to consume for deployment and mining
// into the blockchain.
const buildDeployOptions = (compiledContract) => {
  // prepend 0x so geth can parse
  const bytecode = `0x${compiledContract.bytecode}`;
  const gasEstimate = web3.eth.estimateGas({data: bytecode});
  return {
    from: web3.eth.accounts[0],
    data: bytecode,
    gas: (gasEstimate*2),
  };
};

const folder = process.env.CONTRACT_PATH;
const contractConfig = require(`./${folder}/config`);
const source = fs.readFileSync(`./${folder}/contract.sol`, 'utf8');
const compiled = solc.compile(source, 1);
const compiledContract = compiled.contracts[`:${contractConfig.contractName}`];
const abiObject = JSON.parse(compiledContract.interface);
const contract = web3.eth.contract(abiObject);
const options = buildDeployOptions(compiledContract);
const args = contractConfig.params.concat([options]);
deployContractPromise(contractConfig.contractName, contract, args)
  .then((results) => console.log(results));
