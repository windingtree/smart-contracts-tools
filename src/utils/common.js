const fs = require('fs');
const path = require('path');

module.exports.isFileExists = (base, file) => fs.existsSync(path.resolve(base, file));
