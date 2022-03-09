# get-build-id

> GitHub action to fetch the build ID from Next.js deployment

## Outputs

See [action.yml](./action.yml) for the current outputs

- `buildId` The string build id
- `branch` The source branch extracted from the build id, if any
- `commit` The commit SHA extracted from the build id, if any

You can access the above outputs using `${{ steps.<step name>.outputs.<output name> }}` expression syntax, see the [ci.yml](./.github/workflows/ci.yml) workflow.

## Use

In your `next.config.js` return the build ID formed from the `branch:::commit SHA` strings, for example like [this](https://github.com/bahmutov/next-ts-app/blob/main/next.config.js)

```js
// next.config.js
// https://github.com/cypress-io/commit-info
const { getBranch, getSha } = require('@cypress/commit-info')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: async () => {
    // make sure to use Vercel variables if available
    // https://vercel.com/docs/concepts/projects/environment-variables
    const branch =
      process.env.VERCEL_GIT_COMMIT_REF ||
      (await getBranch()) ||
      'unknown branch'
    const sha =
      process.env.VERCEL_GIT_COMMIT_SHA || (await getSha()) || 'unknown sha'
    const buildId = `${branch}:::${sha}`
    console.log('generated build id "%s"', buildId)
    return buildId
  },
}

module.exports = nextConfig
```

The build ID embedded in the application will usually be something like "main:::<sha>". This build ID is embedded in every HTML page, and you can get to it using this action. In your workflow use:

```yml
- name: Get the build info 🖨
  uses: bahmutov/get-build-id@v1
  id: get-build-id
  with:
    # USE YOUR DEPLOYED URL
    url: 'https://next-ts-app-swart.vercel.app/'

- name: Print the build outputs 🖨
  run: |
    echo "Next.js build ID: ${{ steps.get-build-id.outputs.buildId }}"
    echo "Next.js build branch: ${{ steps.get-build-id.outputs.branch }}"
    echo "Next.js build commit: ${{ steps.get-build-id.outputs.commit }}"
```

## Examples

- [bahmutov/next-ts-app-tests](https://github.com/bahmutov/next-ts-app-tests) as described in the blog post [Code Coverage For Nextjs Application](https://glebbahmutov.com/blog/code-coverage-for-nextjs-app/)

## Small print

Author: Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt; &copy; 2022

- [@bahmutov](https://twitter.com/bahmutov)
- [glebbahmutov.com](https://glebbahmutov.com)
- [blog](https://glebbahmutov.com/blog)
- [videos](https://www.youtube.com/glebbahmutov)
- [presentations](https://slides.com/bahmutov)
- [cypress.tips](https://cypress.tips)
- [Cypress Tips Newsletter](https://cypresstips.substack.com/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/get-build-id/issues) on Github

## MIT License

Copyright (c) 2022 Gleb Bahmutov &lt;gleb.bahmutov@gmail.com&gt;

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
