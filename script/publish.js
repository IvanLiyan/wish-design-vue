const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const semver = require('semver');
const currentVersion = require('../package.json').version;
const { prompt } = require('enquirer');
const execa = require('execa');
// function resolve(dir) {
//   return path.join(__dirname, '..', dir);
// }

const versionIncrements = [
  'prerelease:alpha',
  'prerelease:beta',
  'patch',
  'minor',
  'major',
  // 'prepatch',
  // 'preminor',
  // 'premajor',
];

const step = (msg) => console.log(chalk.cyan(msg));
const success = (msg) => console.log(chalk.green(msg));

async function main() {
  let targetVersion;
  const releases = versionIncrements.map((type) => {
    const preId = type.split(':');
    return `${type} (${semver.inc(currentVersion, preId[0], preId[1])})`;
  });

  releases.push('custom');
  const { release } = await prompt({
    type: 'select',
    name: 'release',
    message: 'Select release type',
    choices: releases, // versionIncrements.map(i => `${i} (${inc(i)})`).concat(['custom'])
  });
  if (release === 'custom') {
    targetVersion = (
      await prompt({
        type: 'input',
        name: 'version',
        message: 'Input custom version',
        initial: currentVersion,
      })
    ).version;
  } else {
    targetVersion = release.match(/\((.*)\)/)[1];
  }
  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`);
  }
  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`
  })

  if (!yes) {
    return
  }
  // step('\nRunning tests...')
  // await execa('npm', ['run', 'test'])

  step('\nUpdating cross dependencies...')
  updateVersions(targetVersion)

  step('\nBuilding all packages...')
  await execa('npm', ['run', 'build'])
  success('Build Success')

  // step('Generate Changelog') // todo

  step('\nCommitting changes...')
  await execa('git', ['add', '.'])
  await execa('git', ['commit', '-m', `release: v${targetVersion}`]);

  const tag = semver.prerelease(targetVersion);
  step(`\nPublishing ${tag ? tag[0] : 'lastest'} packages...`)
  
  await execa('cd',['publish']);

  const { stdout } = await execa('npm', ['--registry=http://npm.bjs.i.wish.com',
    '--cache=$HOME/.npm',
    '--userconfig=$HOME/.npmrc',
    'publish',
    ...(tag ? ['--tag', tag[0]] : [])
  ], { shell: true })


  console.log(stdout);
  success('Publishing Success')


  step('\nPushing to Code...')
  await execa('git', ['tag', `v${targetVersion}`])
  await execa('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  await execa('git', ['push'])
  success('Pushing Success')
  success('Release Success')
}

function updateVersions(version) {
  
  // 1. update root package.json
  updatePackage(path.resolve(__dirname, '..'), version);
  
  // 2. update publish package.json
  updatePackage(path.resolve(__dirname, '../publish'), version);
  
}

function updatePackage(pkgRoot, version) {
  const pkgPath = path.resolve(pkgRoot, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

main();
