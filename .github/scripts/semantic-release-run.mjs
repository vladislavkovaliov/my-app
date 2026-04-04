import { appendFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import semanticRelease from 'semantic-release';

function setOutput(name, value) {
    const out = process.env.GITHUB_OUTPUT;
    if (!out || value === undefined || value === null) return;
    appendFileSync(out, `${name}=${String(value)}\n`);
}

function setOutputMultiline(name, value) {
    const out = process.env.GITHUB_OUTPUT;
    if (!out || value === undefined || value === null) return;
    const delim = `DELIM_${randomBytes(16).toString('hex')}`;
    appendFileSync(out, `${name}<<${delim}\n${value}\n${delim}\n`);
}

const result = await semanticRelease();

if (!result) {
    setOutput('new_release_published', 'false');
    process.exit(0);
}

const { lastRelease, commits, nextRelease, releases } = result;

if (lastRelease?.version) {
    setOutput('last_release_version', lastRelease.version);
    setOutput('last_release_git_head', lastRelease.gitHead);
    setOutput('last_release_git_tag', lastRelease.gitTag);
}

if (!nextRelease) {
    setOutput('new_release_published', 'false');
    process.exit(0);
}

const { version, channel, notes, gitHead, gitTag } = nextRelease;
const [major, minor, patch] = version.split(/\.|-|\s/g, 3);

setOutput('new_release_published', 'true');
setOutput('new_release_version', version);
setOutput('new_release_major_version', major);
setOutput('new_release_minor_version', minor);
setOutput('new_release_patch_version', patch);
setOutput('new_release_channel', channel ?? '');
setOutputMultiline('new_release_notes', notes ?? '');
setOutput('new_release_git_head', gitHead);
setOutput('new_release_git_tag', gitTag);

for (const release of releases ?? []) {
    if (release?.pluginName) {
        process.stdout.write(`Published with plugin "${release.pluginName}"\n`);
    }
}
process.stdout.write(
    `Published ${nextRelease.type} release ${version} (${commits?.length ?? 0} commits).\n`,
);
