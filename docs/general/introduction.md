# The Hitchhikers Guide

## Project Structure

Let's start with understanding why we have chosen our particular structure.

- You will write your app in the `app` folder. This is the folder you will spend most, if not all, of your time in.
- Configuration, generators and templates are in the `internals` folder.
- The `server` folder contains development and production server configuration files.

### `app/`

We use the [container/component architecture](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.4rmjqneiw). `containers/` contains React components which are connected to the redux store. `components/` contains dumb React components which depend on containers for data. **Container components care about how things work, while components care about how things look.**

We've found that for many applications treating single pages (e.g. the Loginpage, the Homepage etc.) as containers and their small parts (e.g. the Login form, the Navigation bar) as components works well, but there are no rigid rules. **Bend the architecture to the needs of your app, nothing is set in stone!**

### `internals/`

You can call this area the "engine" of your app. Your source code cannot be executed as-is in the web browser. It needs to pass through webpack to get converted into a form that web browsers understand. While it's certainly helpful to understand what is happening here, for real world usage you won't have to mess around with this folder much.

- `internals/webpack`: You'll most probably use EcmaScript 6 or EcmaScript 7 to write the source code of your app. webpack takes care of making it compatible with a majority of browsers.

> ([ECMAScript](http://stackoverflow.com/a/33748400/5241520) is the standard for JavaScript. Most people are still using browsers which understand ECMAScript 5. So your code must be [transpiled](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them) into browser-understandable code. To apply the transpiler to your source code, you will use webpack. Feeling the jitters already? [Don't worry](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f#.d2uasw2n6). Take a tea-break and then read on)

- `internals/testing`: This folder contains testing utilities which Jest needs

### `server/`

As the name suggests, this folder contains development and production server configuration.

## Basic Building Blocks

These days when musicians produce music, they record different parts of the song separately. So vocals, drums, guitar, bass may be played in separate sessions and when they're satisfied with their work, the sessions are combined into a beautiful song. In a similar fashion, let's understand the role of different technologies and in the end, we'll see how everything converges into a single application.

You can launch the example app by running `npm start`. To fully understand its inner workings, you'll have to understand multiple technologies and how they interact. From this point, we're going into an overdrive of implementation details. We'll simplify the technical jargon as much as we can. Please bear with us here.

### How does the application boot up?

Like any other webpage your app starts with the [`app/index.html`](../../app/index.html) file. React will render your application into the `div#app` .

But how do we include all of your react components into a single html file? That's where webpack comes into the picture. Webpack will literally pack your application into small javascript files. These files will be injected into the `index.html` as `<script>` tags.

When your application is deployed on a server, browsers will load this html file. The javascript files that webpack has included will be executed by the browser, thereby booting up your react application! It's magic really!! No, not really, though it can certainly seem that way. Let's dissect this phenomenon to better know what's really going on.

### `app/app.js`:

When you run `npm start`, a server will be launched in your terminal for development. You can then open [http://localhost:4000](http://localhost:4000) to access the server and see your app.

Webpack requires an entry point to your application. Think of it as a door to your source code. In this project [`app/app.js`](../../app/app.js) is that entry point. Webpack will access the entire app from this file, transpile the application into ES5 and create small chunks of transpiled code. Only the required chunks will be loaded in the browser so that you don't have to worry about the size of your application.

`app/app.js` is one of the biggest files of the project. It contains all the global setup to make sure your app runs smoothly. Let's break its contents down:

- `babel-polyfill` is imported. This enables cool stuff like generator functions, `Promise`s, etc.
- A redux `store` is instantiated.
- A `history` object is created, which remembers all the browsing history for your app. This is used by the router to know which page your users visit. (very useful for analytics, by the way)
- A Router is connected to Redux.
- Hot module replacement setup via vanilla [Webpack HMR](https://webpack.js.org/guides/hot-module-replacement/) that makes all the reducers, injected sagas, components, containers, and i18n messages hot reloadable. 
- i18n internationalization support setup.
- `ReactDOM.render()` not only renders the [root react component](../../app/containers/App/index.js) called `<App />`, of your application, but it renders it with `<Provider />`, `<LanguageProvider />` and `<Router />`.
 * `<Provider />` connects your app with the redux `store`.

### Redux

Redux is going to play a huge role in your application. If you're new to Redux, we'd strongly suggest you to complete this checklist and then come back:

- [ ] Understand the motivation behind Redux
- [ ] Understand the three principles of Redux
- [ ] Implement Redux in a small React app of yours

The Redux `store` is the heart of your application. Check out [`configureStore.js`](../../app/utils/configureStore.js) to see how we have configured the store.

The store is created with the `createStore()` factory, which accepts three parameters.

1. **Root reducer:** A master reducer combining all your reducers.
2. **Initial state:** The initial state of your app as determined by your reducers.
3. **Middleware/enhancers:** Middlewares are third party libraries which intercept each redux action dispatched to the redux store and then... do stuff. For example, if you install the [`redux-logger`](https://github.com/evgenyrodionov/redux-logger) middleware, it will listen to all the actions being dispatched to the store and print previous and next state in the browser console. It's helpful to track what happens in your app.

In our application we are using two such middleware.

1. **Router middleware:** Keeps your routes in sync with the redux `store`.
2. **Redux saga:** Is used for managing _side-effects_ such as dispatching actions asynchronously or accessing browser data.

### Reselect

Reselect is a library used for slicing your redux state and providing only the relevant sub-tree to a react component. It has three key features:

1. Computational power
2. Memoization
3. Composability

Imagine an application that shows a list of users. Its redux state tree stores an array of usernames with signatures:

`{
  id: number,
  username: string,
  gender: string,
  age: number
}`.

Let's see how the three features of reselect help.

- **Computation:** While performing a search operation, reselect will filter the original array and return only matching usernames. Redux state does not have to store a separate array of filtered usernames.
- **Memoization:** A selector will not compute a new result unless one of its arguments change. That means, if you are repeating the same search once again, reselect will not filter the array over and over. It will just return the previously computed, and subsequently cached, result. Reselect compares the old and the new arguments and then decides whether to compute again or return the cached result.
- **Composability:** You can combine multiple selectors. For example, one selector can filter usernames according to a search key and another selector can filter the already filtered array according to gender. One more selector can further filter according to age. You combine these selectors by using `createSelector()`

### Redux Saga

If your application is going to interact with some back-end application for data, we recommend using redux saga for side effect management. Too much jargon? Let's simplify.

Imagine that your application is fetching data in json format from a back-end. For every API call, ideally you should define at least three kinds of [action creators](http://redux.js.org/docs/basics/Actions.html):

1. `API_REQUEST`: Upon dispatching this, your application should show a spinner to let the user know that something's happening.
2. `API_SUCCESS`: Upon dispatching this, your application should show the data to the user.
3. `API_FAILURE`: Upon dispatching this, your application should show an error message to the user.

And this is only for **_one_** API call. In a real-world scenario, one page of your application could be making tens of API calls. How do we manage all of them effectively? This essentially boils down to controlling the flow of your application. What if there was a background process that handles multiple actions simultaneously, communicates with redux store and react containers at the same time? This is where redux-saga comes into the picture.

The mental model is that a saga is like a separate thread in your application that's solely responsible for side effects. `redux-saga` is a redux middleware, which means this thread can be started, paused and cancelled from the main application with normal redux actions, it has access to the full redux application state and it can dispatch redux actions as well.
