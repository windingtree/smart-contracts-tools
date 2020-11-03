global.web3 = web3;
const {
    parseArgv,
    extractBasePath
} = require('./utils/cli');

// Commands modules
const version = require('./commands/version');
const deploy = require('./commands/deploy');
const upgrade = require('./commands/upgrade');
const makehash = require('./commands/makehash');
const call = require('./commands/call');
const tx = require('./commands/tx');
const task = require('./commands/task');

// Truffle script body
const main = async () => {
    const basePath = extractBasePath(process.argv);
    const args = parseArgv(process.argv, 7);

    switch (args.cmd) {
        case 'version':
            await version(args, basePath);
            break;

        case 'deploy':
            await deploy(args, basePath);
            break;

        case 'upgrade':
            await upgrade(args, basePath);
            break;

        case 'makehash':
            await makehash(args, basePath);
            break;

        case 'call':
            await call(args, basePath);
            break;

        case 'tx':
            await tx(args, basePath);
            break;

        case 'task':
            await task(args, basePath);
            break;

        default:
            return console.log(`Error: Unknown command "${args.cmd}"`);
    }
};

module.exports = callback => main()
    .then(() => callback())
    .catch(err => callback(err));
