// deploy code will go here
require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
// Update the import to destructure the abi (formerly the interface) and the evm (bytecode)
const {abi, evm} = require('./compile');

// the purpose of this module is to connect to network and unlock account; using infura.io
const provider = new HDWalletProvider(
    `${process.env.TEST_ACCOUNT_KEY}`,
    `${process.env.TEST_NETWORK_URL}`
);

const web3 = new Web3(provider);
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);
    const instanceOfContract = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: ['Hi there!']
        })
        .send({
            gas: '1000000',
            from: accounts[0]
        });
    console.log('Contract deployed to', instanceOfContract.options.address);
    // prevent hanging deployment
    provider.engine.stop();

};

deploy();
