/**
 * @type {import('semantic-release').Options}
 */
module.exports = {
    // Нужна минимум одна release-ветка, существующая на remote (см. ERELEASEBRANCHES).
    // Если в origin нет `dev`, а есть только `main`, без `main` в списке release-веток будет [].
    branches: [
        'dev',
        'main',
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
                    // Без перевода строки в конце каждый следующий коммит прилипает к предыдущему: `)* fix:`.
                    commitPartial: '* {{header}}{{#if hash}} ({{shortHash}}){{/if}}\n',
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
                // Дефолтный getFailComment() обращается к branch.name; при падении до resolve ветки branch нет — TypeError.
                failComment:
                    '## Automated release failed\n\n<%= errors.map((e) => "### " + e.message + "\\n\\n" + (e.details || "")).join("\\n\\n---\\n\\n") %>',
            },
        ],
    ],
};
