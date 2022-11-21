// add an SPDX identifier to the top of the contract (will address compilation warnings)
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Inbox {
    string public message;
    // Refactor the Inbox constructor to use the new constructor keyword
    constructor(string memory initialMessage) {
        message = initialMessage;
    }
    // Specify the data location of the variables to be memory
    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}