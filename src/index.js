// @ts-check
const core = require('@actions/core')

if (!process.env.GITHUB_EVENT) {
  console.log('GITHUB_EVENT is not defined')
  process.exit(0)
}
const ghEvent = JSON.parse(process.env.GITHUB_EVENT)

let branch
if (ghEvent.pull_request) {
  branch = ghEvent.pull_request.head.ref
  core.setOutput('branch', branch)
} else {
  branch = ghEvent.ref.replace('refs/heads/', '')
  core.setOutput('branch', branch)
}

if (ghEvent.action !== 'edited') {
  process.exit(0)
}

// TODO check if this was really an edit of the PR body
const commit = ghEvent.pull_request.head.sha

const runTestsCheckboxUnfilled = '[ ] re-run the tests'
const runTestsCheckboxFilled = '[x] re-run the tests'
if (
  ghEvent.changes.body.from.includes(runTestsCheckboxUnfilled) &&
  ghEvent.pull_request.body.includes(runTestsCheckboxFilled)
) {
  console.log(
    'Should run GH action on branch "%s" and commit %s',
    branch,
    commit,
  )
  core.setOutput('shouldRun', true)
  core.setOutput('commit', commit)
} else {
  console.log('Should not run GH action')
}
