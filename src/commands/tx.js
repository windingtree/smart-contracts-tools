const path = require('path');
const { title, log } = require('../utils/stdout');
const { parseParams, applyArgs, parseCallResult } = require('../utils/cli');
const expect = require('../utils/expect');

const { Contracts, ZWeb3 } = require('@openzeppelin/upgrades');

module.exports = async (options, basePath) => {
    title('Sending a transaction to contract');

    expect.all(options, {
        name: {
            type: 'string'
        },
        address: {
            type: 'address'
        },
        from: {
            type: 'address'
        },
        method: {
            type: 'string',
            required: false
        },
        args: {
            type: 'string',
            required: false
        }
    });

    const {
        name,
        address,
        from,
        method,
        args
    } = options;

    const truffleJs = require(path.resolve(basePath, 'truffle'));

    log('Contract name', name);
    log('Method', method);

    let argsParsed = [];

    if (args) {
        argsParsed = applyArgs(
            parseParams(args),
            {
                '[OWNER]': from,
                '[FROM]': from
            }
        );
    }

    log('Arguments', args || '');

    ZWeb3.initialize(web3.currentProvider);

    const ContractSchema = Contracts.getFromLocal(name);
    const network = await web3.eth.net.getNetworkType();
    const truffleConfig = truffleJs.networks[network === 'private' ? 'development' : network];
    const txParams = Object.assign({}, Contracts.getDefaultTxParams(), {
        from,
        gas: truffleConfig.gas,
        gasPrice: truffleConfig.gasPrice
    });
    const contract = ContractSchema.at(address);

    const result = await (await contract.methods[method].apply(contract, argsParsed)).send(txParams);

    log('Result', parseCallResult(result));

    return result;
};
