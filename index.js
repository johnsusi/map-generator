module.exports = require('bindings')([
    'map-generator',
    process.version,
    process.platform,
    process.arch].join('-'));
