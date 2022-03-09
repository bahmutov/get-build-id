# get-build-id

> GitHub action to fetch the build ID from Next.js deployment

## Outputs

See [action.yml](./action.yml) for the current outputs

- `buildId` The string build id
- `branch` The source branch extracted from the build id, if any
- `commit` The commit SHA extracted from the build id, if any

You can access the above outputs using `${{ steps.<step name>.outputs.<output name> }}` expression syntax, see the [pr-edit.yml](./.github/workflows/pr-edit.yml) workflow.

## Use

Create a [GitHub Actions](https://glebbahmutov.com/blog/trying-github-actions/) workflow that runs on pull request edits.

```yml
# .github/workflows/pr.yml
name: pr
on:
  pull_request:
    types:
      - edited
jobs:
  trigger-tests:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v2

      - name: Check the PR
        # https://github.com/bahmutov/should-run-github-action
        uses: bahmutov/should-run-github-action@v1
        id: check-pr
        env:
          GITHUB_EVENT: ${{ toJson(github.event) }}

      - name: Run tests if the user clicked the checkbox
        if: ${{ steps.check-pr.outputs.shouldRun }}
        run: echo "Running tests..."
```

In your GitHub pull request template, use a checkbox

```yml
# .github/PULL_REQUEST_TEMPLATE.md

To re-run the tests, pick the tags above then click the checkbox below

- [ ] re-run the tests
```

When the user clicks on the checkbox and changes its state from empty to filled, the action sets its output to `true` to trigger the other workflow steps.

## Examples

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
