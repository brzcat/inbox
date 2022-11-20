const assert = require('assert');
const ganache = require('ganache-cli');
// we are using a Constructor function (that's why its uppercase)
const Web3 = require('web3');

//lower case means instance
const web3 = new Web3(ganache.provider());
let testAccountsForLocalTesting;
beforeEach(async () => {
    // Get the list of all accounts; every call we make in web3 is async in ature
    testAccountsForLocalTesting = await web3.eth.getAccounts();
    // Use one of those accounts to deploy the contract
});

describe('Inbox', () => {
    it('deploy contract', () => {
        console.log(testAccountsForLocalTesting);
    });

});