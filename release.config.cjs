'use strict';

const { getPlugins } = require('./config/semantic-release/plugins.cjs');

module.exports = {
    plugins: getPlugins('Bug Fixes'),
    branches: ['+([0-9])?(.{+([0-9]),x}).x', 'main'],
};
