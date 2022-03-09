// @ts-check
const got = require('got')
const core = require('@actions/core')

async function getBuildId(url) {
  // @ts-ignore
  const response = await got(url)
  const html = response.body
  // console.log('response')
  // console.log(html)
  const regex = /"buildId":"(?<buildId>[A-Za-z0-9\-.:]+)"/
  const match = regex.exec(html)
  // console.log(match)

  const info = {}
  if (match && match.groups.buildId) {
    info.buildId = match.groups.buildId
    const separator = ':::'
    if (info.buildId.includes(separator)) {
      const [branch, commit] = info.buildId.split(separator)
      if (branch) {
        info.branch = branch
      }
      if (commit) {
        info.commit = commit
      }
    }
  }

  return info
}

const url = core.getInput('url')
if (!url) {
  throw new Error('url is required')
}
getBuildId(url).then((info) => {
  if (!info) {
    console.warn('Could not find build Id from URL %s', url)
    return
  }
  if (info.buildId) {
    core.setOutput('buildId', info.buildId)
  }
  if (info.branch) {
    core.setOutput('branch', info.branch)
  }
  if (info.commit) {
    core.setOutput('commit', info.commit)
  }
})
