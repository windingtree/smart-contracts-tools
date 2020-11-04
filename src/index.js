#!/usr/bin/env node
const { spawn } = require('child_process');
const { isFileExists } = require('./utils/common');

const basePath = process.cwd();

if (!isFileExists(basePath, '.openzeppelin/project.json')) {
    return console.log(`Error: Openzeppelin configuration not found on the path: "${basePath}/.openzeppelin/project.json"`);
}

if (!isFileExists(basePath, 'truffle.js')) {
    return console.log(`Error: Truffle configuration not found on the path: "${basePath}/truffle.js"`);
}

// Compose command line
const args = ['truffle', 'exec', `${__dirname}/cli.js`, `basePath=${basePath}`];
Array.prototype.push.apply(args, process.argv.slice(2));

if (!args.includes('--network')) {
    return console.log('Error: "--network" parameter is required');
}

const cmd = spawn('npx', args);

cmd.stdout.on('data', data => {
    console.log(data.toString().replace(/[\n\r]$/, ''));
});

cmd.stderr.on('data', data => {
    console.error(data.toString().replace(/[\n\r]$/, ''));
});

cmd.on('close', code => {
    process.exit(code);
});

cmd.on('error', function (err) {
    throw err;
});
