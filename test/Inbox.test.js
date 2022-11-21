const assert = require('assert');
// local test network - auto generate some number of accounts.  Always completes transaction near real-time.
const ganache = require('ganache-cli');
// we are using a Constructor function (that's why its uppercase); how we retrieve info from ethereum network
// needs a provider as well as account
const Web3 = require('web3');

//lower case means instance
const web3 = new Web3(ganache.provider());
// pulled from definition from contract.
// abi translation network to the javascript world -- bytecode is the compiled code.
const { abi, evm } = require('../compile');

let testAccountsForLocalTesting;
let inbox;
let initialString = 'Hi there!';
beforeEach(async () => {
    // Get the list of all accounts; every call we make in web3 is async in ature
    testAccountsForLocalTesting = await web3.eth.getAccounts();
    // Use one of those accounts to deploy the contract
    // constructor ; remember when we modify blockchain, we need to pay some gas
    inbox = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: ['Hi there!'],
        })
        .send({ from: testAccountsForLocalTesting[0], gas: '1000000' });
});

describe('Inbox', () => {
    it('deploy contract', () => {
        console.log(inbox);
        assert.ok(inbox.options.address);
    });
    it('has a default message', async () => {
        // first set some way to customize the functions in the methods.
        // second customize how those methods are being called.
        const actual = await inbox.methods.message().call();
        assert.equal(actual, initialString);
    });
    it('can modify message', async () => {
        const newMsg = 'bye';

        // if this fails, promise will be rejected and Error is thrown.
        // send -- who is going to pay.
        await inbox.methods.setMessage(newMsg).send({from: testAccountsForLocalTesting[0]});
        const actual = await inbox.methods.message().call();
        assert.equal(actual, newMsg);

    });
});