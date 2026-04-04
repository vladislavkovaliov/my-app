'use strict';

const { getPlugins } = require('./config/semantic-release/plugins.cjs');

module.exports = {
    plugins: getPlugins('Fixes'),
    branches: [
        '+([0-9])?(.{+([0-9]),x}).x',
        'main',
        { name: 'dev/*', prerelease: '${name.replace(/^dev\\//g, "dev-")}' },
        { name: 'feature/*', prerelease: '${name.replace(/^feature\\//g, "feature-")}' },
        { name: 'hotfix/*', prerelease: '${name.replace(/^hotfix\\//g, "hotfix-")}' },
    ],
};
