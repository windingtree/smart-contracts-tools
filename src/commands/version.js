const path = require('path');
const { title, log } = require('../utils/stdout');

module.exports = async (args, basePath) => {
    const packageJson = require(path.resolve(basePath, '.openzeppelin/project.json'));
    title('WindingTree Command Line Interface');
    log('Openzeppelin Project Version', packageJson.version);

    return {
        version: packageJson.version
    };
};
