// guaranteed cross platform path
const path = require("path");
const fs = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf8");

/*
Add the expected JSON formatted input, specifying the language, sources, and outputSelection - Source.

Update the export to provide the expected JSON formatted output - Source

Note - the output is structured differently so the accessors have changed slightly. If you have a doubt you can add a console.log to view this structure:

 */

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
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


//console.log(solc.compile(source, 1).contracts[':Inbox']);
//[<can_be_file_name>:Inbox]
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Inbox.sol'
    ].Inbox;
