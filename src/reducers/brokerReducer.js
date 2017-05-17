import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';


export default function brokerReducer(state = initialState.brokers, action) {
  switch(action.type) {
    case types.LOAD_BROKERS_SUCCESS:
     return action.brokers
    case types.CREATE_BROKER_SUCCESS:
      browserHistory.push(`/brokers/${action.broker.id}`)
      return [
        ...state.filter(broker => broker.id !== action.broker.id),
        Object.assign({}, action.broker)
      ]
    case types.UPDATE_BROKER_SUCCESS:
      return [
        ...state.filter(broker => broker.id !== action.broker.id),
        Object.assign({}, action.broker)
      ]
    case types.DELETE_BROKER_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfBrokerToDelete = state.findIndex(broker => {return broker.id == action.broker.id})
      newState.splice(indexOfBrokerToDelete, 1);
      browserHistory.push('/brokers');
      return newState;
    }
    default: 
      return state;
  }
}
