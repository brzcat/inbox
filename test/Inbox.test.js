const assert = require('assert');
const ganache = require('ganache-cli');
// we are using a Constructor function (that's why its uppercase)
const Web3 = require('web3');

//lower case means instance
const web3 = new Web3(ganache.provider());
// pulled from definition from contract.
const {interface, bytecode} = require('../compile');

let testAccountsForLocalTesting;
let inbox;
let initialString = 'Hi there!';
beforeEach(async () => {
    // Get the list of all accounts; every call we make in web3 is async in ature
    testAccountsForLocalTesting = await web3.eth.getAccounts();
    // Use one of those accounts to deploy the contract
    // constructor ; remember when we modify blockchain, we need to pay some gas
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
            arguments: [initialString]
        })
        .send({
            from: testAccountsForLocalTesting[0],
            gas: '1000000'
        });

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
        await inbox.methods.setMessage(newMsg).send({from: testAccountsForLocalTesting[0]});
        const actual = await inbox.methods.message().call();
        assert.equal(actual, newMsg);

    });
});