/**
 * @type {import('semantic-release').Options}
 */
module.exports = {
    branches: [
        'dev',
        {
            name: 'rc/*',
            range: '<%= name.replace(/^rc\\//, "") %>',
        },
    ],
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
            },
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                preset: 'conventionalcommits',
                presetConfig: {
                    types: [
                        { type: 'feat', section: 'Features' },
                        { type: 'fix', section: 'Fixes' },
                        { type: 'perf', section: 'Performance Improvements' },
                        { type: 'revert', section: 'Reverts' },
                        { type: 'docs', section: 'Documentation' },
                        { type: 'style', section: 'Styles' },
                        { type: 'chore', section: 'Chores' },
                        { type: 'refactor', section: 'Code Refactoring' },
                        { type: 'test', section: 'Tests' },
                        { type: 'build', section: 'Build' },
                        { type: 'ci', section: 'CI/CD' },
                    ],
                },
                writerOpts: {
                    commitPartial: '* {{header}}{{#if hash}} ({{shortHash}}){{/if}}',
                },
            },
        ],
        '@semantic-release/changelog',
        '@semantic-release/npm',
        '@semantic-release/git',
        '@semantic-release/exec',
        [
            '@semantic-release/github',
            {
                draftRelease: true,
            },
        ],
    ],
};
