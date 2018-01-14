# React-Redux Study
## Actions
Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. 

You send them to the store using **store.dispatch()**.

Actions are plain **JavaScript objects**.

Example:

```javascript
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```
Actions must have a **type** property that indicates the type of action being performed.

### Action Creators
Action creators are **functions** that create actions. 

``` javascript
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```
Action creators should be called by `store.dispatch()`. It sends the action to the store, and reducer will handle the action to generate new state.

To actually initiate a dispatch, you need to pass the result of the creator method to the `store.dispatch()` function.

In react-redux you will use `connect() and bindActionCreators()`. `bindActionCreators()` can automatically bind many action creators to a dispatch() function.

## Reducers

Reducers are pure functions which receive the action with previous state sent by `store.dispatch()` and return the next state.

```
(previousState, action) => newState
```

**Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.**

### Don't mutate the state!!!
Example:

```javascript
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
     default:
     	return state;
   }
}  	
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```

### combineReducers

Combine different reduces together, each of these reducers is managing its own part of the global state. 

```javascript
import { combineReducers } from 'redux'

const todoApp = combineReducers({
  visibilityFilter: doSomethingWithA,
  todos: processB,
  c: c
})
export default todoApp

```
The keys of the combineReducers are the keys of the global state. In the previous example `visibilityFilter`, `todos`, `c` are the keys of the global state.

## Store

**Store is the object that brings reducers and actions together.**

**There is only one store in the application.**

The store has the following responsibilities:

1. Holds application state;
1. Allows access to state via **`getState()`**;
1. Allows state to be updated via `dispatch(action)`;
1. Registers listeners via `subscribe(listener)`;
1. Handles unregistering of listeners via the function returned by `subscribe(listener)`.
Example:

```
import { createStore } from 'redux'
import todoApp from './reducers'

let store = createStore(todoApp)
```

## Operation workflow

1. Someone/Some operation call `store.dispatch(action)`. In react-redux, a method in the props is called, and 
1. The Redux store calls the reducer function to handle the action. The store will pass two arguments to the reducer: the current **state tree**  and the **action** .
1. The root reducer may combine the output of multiple reducers into a single state tree
1. The Redux store saves the complete state tree returned by the root reducer.

## Usage with React

**Component(Presentational)**: How things look (markup, styles), read data from props, Invoke callbacks from props.

**Container**: Connect Component to the Redux store.

### Presentational Components
Presentational Components are just nomal react components. They accept **“props”** and return React elements describing what should appear on the screen.
Example:

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### Container Components

To generate container components we need to use `connect()` function.

```
import { connect } from 'react-redux'

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```
### connect(): Connects a React component to a Redux store. 

```
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
```
**mapStateToProps**: Tells how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping. Any time the store is updated, mapStateToProps will be called. The results of mapStateToProps must be a plain object, which will be merged into the component’s props. If you don't want to subscribe to store updates, pass null or undefined in place of mapStateToProps.

```
mapStateToProps(state, [ownProps]);
```
```
function mapStateToProps(state) {
	return {
		posts: state.posts
	}
}

export default connect(mapStateToProps, { fetchPosts })(PostIndex);
```
Container components can dispatch actions too.

**mapDispatchToProps**: receives the dispatch() method and returns callback props that you want to inject into the presentational component. 

```
mapDispatchToProps(dispatch, [ownProps])
```

**1. If an object is passed as the second value of the connect method, each function inside it is assumed to be a Redux action creator.**

**2. If a function is passed as the second value of the connect method, it will be given dispatch as the first parameter. It’s up to you to return an object that somehow uses dispatch to bind action creators in your own way, you may use the bindActionCreators() helper from Redux.**

**3. If you do not supply your own mapDispatchToProps function or object full of action creators, the default mapDispatchToProps implementation just injects dispatch into your component’s props.**

```javascript
// In this case fetchPosts is an action creator
export default connect(mapStateToProps, { fetchPosts })(PostIndex);
```
```
//In this case you need to return an object with an method to call dispatch() to bind action creators. toggleTod(id) is an action creator.
// In this case props has an method called onTodoClick, which is bind
// to action creator toggleTodo.
const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}
```

```
// In this case props has an field called actions, it is an object, it has many methods, each method is an action creator.
import * as actionCreators from './TodoActionCreators'
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actionCreators, dispatch) }
     // {
     //   addTodo: Function,
     //   removeTodo: Function
     // }
}

```

```
// In this case dispatch is injected as a field of props
let AddTodo = ({ dispatch }) => {
  return (
    <div>
    <h1>Hello world</h1>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo
```

### Provider

Makes the Redux store available to the connect() calls in the component hierarchy below. Normally, you can’t use connect() without wrapping a parent or ancestor component in <Provider>.

```
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
```

## Some template codes:

```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form';
import { combineReducers } from 'redux';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const rootReducer = combineReducers({
  	posts:PostReducer,
  	form: formReducer
});

export default rootReducer;
```

## Redux-thunk

### Provide Direct control of `DISPATCH`!
Redux Thunk middleware allows you to write action creators that return a **function** instead of an action. The thunk can be used to **delay** the `dispatch` of an action, or to dispatch only if a certain **condition** is met. The inner function receives the store methods **dispatch** and **getState** as parameters.

**The function returned by the actionCreator has two params: dispatch and getState.**

Some Examples:

```
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}
function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch` 
      dispatch(increment());
    }, 1000);
  };
}

// perform conditional dispatch:
function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();
    if (counter % 2 === 0) {
      return;
    }
    dispatch(increment());
  };
}

function fetchSecretSauce() {
  return fetch('https://www.google.com/search?q=secret+sauce');
}

function makeASandwich(forPerson, secretSauce) {
  return {
    type: 'MAKE_SANDWICH',
    forPerson,
    secretSauce
  };
}

function apologize(fromPerson, toPerson, error) {
  return {
    type: 'APOLOGIZE',
    fromPerson,
    toPerson,
    error
  };
}

function makeASandwichWithSecretSauce(forPerson) {
  // Return a function that accepts `dispatch` so we can dispatch later. 
  // Thunk middleware knows how to turn thunk async actions into actions. 
  return function (dispatch) {
  //The return value is a promise!!!!!!!!!!!
    return fetchSecretSauce().then(
      sauce => dispatch(makeASandwich(forPerson, sauce)),
      error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    );
  };
}
```

To enable Redux Thunk, use applyMiddleware(): 

```
import thunk from 'redux-thunk';
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
```

## React-Router
First we will need to import <Router /> and <Route /> from React Router. 

```
import { BrowserRouter as Router, Route } from 'react-router-dom'
```

Wrap `<Route />` in `<Router /> `so that when the URL changes, <Router /> will match a branch of its routes, and render their configured components.

```
const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
      <Route path="/:filter?" component={App2} />
    </Router>
  </Provider>
)
```

`<Link />` component that lets you navigate around your application.

```
<div>
	<Link to="/">Back to Index</Link>
	<button
		className="btn btn-danger pull-xs-right"		onClick={this.onDeleteClick.bind(this)}>
			Delete this post
	</button>
</div>
```

`<NavLink />` accepts styling props. For instance, the activeStyle property lets us apply a style on the active state.

mapStateToProps second param: **ownProps**, it is the props passed to the connected component as the second parameter

We can access the param sent by Route using `ownProps.match.params` or `this.props.match.params`

```
<Switch>
/*
	Switch will select the first matching path.For example,
	'/' matches /posts/new, since /posts/new is the first one, and it 	will be matched.
*/
	<Route path="/posts/new" component={PostsNew}></Route>
	<Route path="/posts/:id" component={PostsShow}></Route>
	<Route path="/" component={PostIndex}></Route>
</Switch>
```

## Reselect Middleware
Reselect is a simple library for creating memoized, composable selector functions. Reselect selectors can be used to efficiently compute derived data from the Redux store.

Reselect provides a function createSelector for creating memoized selectors. createSelector takes an array of input-selectors and a transform function as its arguments. If the Redux state tree is mutated in a way that causes the value of an input-selector to change, the selector will call its transform function with the values of the input-selectors as arguments and return the result. If the values of the input-selectors are the same as the previous call to the selector, it will return the previously computed value instead of calling the transform function.

```
import { createSelector } from 'reselect'

const getVisibilityFilter = (state) => state.visibilityFilter
const getTodos = (state) => state.todos

export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)
```

#### Connecting a Selector to the Redux Store
```
import { getVisibleTodos } from '../selectors'
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state)
  }
}
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList

```
