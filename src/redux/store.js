import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import auth from './auth/reducer'

const rootReducer = combineReducers({
  auth: auth
});

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk))
);

export default store;
