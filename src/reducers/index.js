import {combineReducers} from 'redux';
import brokers from './brokerReducer';

const rootReducer = combineReducers({
  // short hand property names
  brokers
})

export default rootReducer;