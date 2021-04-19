import Web3 from 'web3';
// Connect to a local Ethereum node over RPC.
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const beneficiary = web3.eth.accounts[1]; // create an account for this
const fundingGoal = web3.toWei(100, 'ether'); // raises 100 ether
const duration = 30; // number of minutes the campaign will last
const price = web3.toWei(0.02, 'ether'); // the price of the tokens, in ether
const reward = process.env.TOKEN_CONTRACT_ADDRESS; // the token contract address.

const params = [beneficiary, fundingGoal, duration, price, reward];
const contractName = 'Crowdsale';

module.exports = {params, contractName};
