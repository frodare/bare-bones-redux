import React from 'react'
import reactDom from 'react-dom'

import { combineReducers, createStore, bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'

/*
 * Redux
 */
const incrementAction = () => ({type: 'INCREMENT'})
const decrementAction = () => ({type: 'DECREMENT'})

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const reducer = combineReducers({
  counter: counterReducer
})

const store = createStore(reducer)
window.store = store

/*
 * React
 */
const Example = ({count, increment, decrement}) => <div>
  <h1>Count: {count}</h1>
  <button onClick={increment}>Increment</button>
  <button onClick={decrement}>Decrement</button>
</div>

const ExampleContainer = connect(
  state => ({
    count: state.counter
  }),
  dispatch => ({
    increment: bindActionCreators(incrementAction, dispatch),
    decrement: bindActionCreators(decrementAction, dispatch)
  })
)(Example)

reactDom.render(
  <Provider store={store}>
    <ExampleContainer />
  </Provider>,
  document.getElementById('app')
)
