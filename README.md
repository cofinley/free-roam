# Free-roam

Currently a work in progress. See [issues](https://github.com/cofinley/free-roam/issues) for work left to do.

You can test drive it at https://cofinley.github.io/free-roam/

## What

A [Roam](https://roamresearch.com) clone. One that is:

- free
- offline
- not a cult

## Why

- I wanted to learn React
- I don't like apps which slap on cloud storage/sync to justify SaaS monthly pricing models
- "That doesn't sound too difficult" famous last words

## Notes

### Data Persistence

Since the app is self-contained, it can be built as a static bundle and hosted on Github Pages [here](https://cofinley.github.io/free-roam/). And since it's static, you can use it as a sandbox where each your edits are only visible to you. The data is local to your browser.

That being said, the app does not (currently) persist data between browser sessions, so **use the save/load buttons in the left sidebar if you want to persist your work.**

### Local Development

Run `yarn start` in the project directory. This runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Local Builds

If you'd like to run the build locally, see [current releases](https://github.com/cofinley/free-roam/releases). Just download the `build.zip`, unzip it, open the `index.html` and enjoy! Again, save and load your data in-between sessions.

If you'd like to build it yourself, run `yarn build`. This will override the homepage from the Github pages URL to `"./"` so that you can use it locally.

### Testing

Testing is on the todo list, as soon as I learn best practice for React + Redux.

Run `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.