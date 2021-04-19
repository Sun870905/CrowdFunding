## Ethereum Tutorials

These contracts come from the [Ethereum Go Wiki Tutorial section](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial).
I have modified the build process, but the contract code is exactly the same.

### TL;DR
Deploy these contracts with the following commands:
```
yarn deployGreeterContract

yarn deployCoinContract

TOKEN_CONTRACT_ADDRESS='token_address' yarn deployCrowdfundContract
```

### Background

In order to test these contracts, I advise you to run a node connected to an Ethereum testnet like ropsten. These instructions include connecting to the ropsten test net.

### Setup

These contracts were compliled and deployed with the following software versions:
* Geth/v1.8.3-stable
* Node v6.11.1
* Yarn 1.3.2

After cloning this repository, install dependencies.
```
yarn install
```

Make sure geth is running with the testnet and rpc options, if it's not already. If this is your first time running geth on the testnet, you will most likely need to let your node sync the blockchain (30 minutes).
```
geth --testnet --rpc
```

Jump into the geth console. The following path assumes MacOS. Adjust accordingly.
```
geth attach '/Users/USER_HERE/Library/Ethereum/testnet/geth.ipc'
```

If you don't have an account yet then create one in the geth console. After creating an account, use a testnet faucet to send Ether to it. You'll need to spend it to mine a contract into the blockchain.
```
> personal.newAccount();
```

Then unlock your account for spending money to mine a contract.
```
> personal.unlockAccount(eth.accounts[0], <Password here>, 50000);
```

Now, assuming you are in this project's directory, compile and run one of the scripts to deploy a contract:
```
yarn deployGreeterContract
```

This will reach out to geth via over your local network via it's API, and attempt to create the contract. 

If geth has synced to the latest block, then you'll see an object containing the address and abi for the contract printed, as well as a helpful command to initialize the contract in the geth console.

Inside the geth javascript console, create your initialize your contract with the following code, or use the command printed out by the build script.
```
> var myContract = web3.eth.contract(YOUR_ABI).at(YOUR_CONTRACT_ADDRESS);
```

You can now call your contract methods. For example:
```
> myContract.greet();
```
and
```
> myContract.kill();
```
