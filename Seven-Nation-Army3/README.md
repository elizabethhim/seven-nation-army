# cra-boilerplate


This project is an [Create React App - v2.1.1](https://facebook.github.io/create-react-app/) boilerplate
with integration of Redux, React Router, Redux thunk & Reactstrap(Bootstrap v4)

[![Build Status](https://travis-ci.org/mohandere/cra-boilerplate.svg?branch=master)](https://travis-ci.org/mohandere/cra-boilerplate) [![Dependency Status](https://dependencyci.com/github/mohandere/cra-boilerplate/badge)](https://dependencyci.com/github/mohandere/cra-boilerplate)

Before starting with project, please headover to [CRA](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md
) documentation.


#### Features

- [Domain-style](https://github.com/reactjs/redux/blob/master/docs/faq/CodeStructure.md) for code structure

## Getting Started

1. Clone this repo

`https://github.com/mohandere/cra-boilerplate.git`

2. To run, go to project folder and run

`$ yarn install` (if you are using yarn)

3. Now start dev server by running -

`$ yarn start`

4. visit - http://localhost:3000/

To create production ready codes -

`$ yarn build`

5. Analyze source code / bundle size

`$ yarn analyze`

for more commands refer `package.json`


## Roadmap

Before starting development please go through -

- [Presentational and Container Components
](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
- [All the fundamental React.js concepts, jammed into this single Medium article](https://medium.freecodecamp.org/all-the-fundamental-react-js-concepts-jammed-into-this-single-medium-article-c83f9b53eac2)
- [When do I know I’m ready for Redux?](https://medium.com/dailyjs/when-do-i-know-im-ready-for-redux-f34da253c85f)

## Code structure

Refer `src/home/` module for an ideal directory structure

Project uses `Domain-style` for code structure-

Domain-style : separate folders per feature or domain, possibly with sub-folders per file type

For more details refer `/src/home` folder.

Reference -

- http://redux.js.org/docs/faq/CodeStructure.html
- http://engineering.kapost.com/2016/01/organizing-large-react-applications/

#### Common components

Place all common components such as Header/Footer in `src/common/components` folder.


### Adding new Module/Feature

- Create a Module/Feature folder at `src/`
like - - `src/home`
Feature folder must contain booststrap file named `index.js` and css file 'style.css' at root

Like -

- `src/home/index.js`
- `src/home/style.scss`

Next as per need, add sub folders like -

- `src/home/actions/`
- `src/home/reducers/`
- `src/home/thunks/`
- `src/home/containers/`
- `src/home/components/`


### Actions

- Create folder named `actions` inside Feature folder like - `src/home/actions`
- Place `actionTypes.js` which contains all actions to be exported

### Reducers

 - Create folder named `reducers` inside Feature folder like - `src/home/reducers`
- Place `index.js` which combines all reducers using `combineReducers`

## Deployment

Refer [deployment](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment) section from CRA doc.


## Issues / Suggestions ?

File an issue [here](https://github.com/mohandere/cra-boilerplate/issues).


## License

MIT

