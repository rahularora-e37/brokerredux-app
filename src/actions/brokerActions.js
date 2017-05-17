import * as types from './actionTypes';
import brokerApi from '../api/BrokersApi';

export function loadBrokersSuccess(brokers) {
  return {type: types.LOAD_BROKERS_SUCCESS, brokers};
}

export function updateBrokerSuccess(broker) {
  return {type: types.UPDATE_BROKER_SUCCESS, broker}
}

export function createBrokerSuccess(broker) {
  return {type: types.CREATE_BROKER_SUCCESS, broker}
}

export function deleteBrokerSuccess(broker) {
  return {type: types.DELETE_BROKER_SUCCESS, broker}
}

export function loadBrokers() {
  // make async call to api, handle promise, dispatch action when promise is resolved
  return function(dispatch) {
    return brokerApi.getAllBrokers().then(brokers => {
      dispatch(loadBrokersSuccess(brokers.brokers));
    }).catch(error => {
      throw(error);
    });
  };
}

export function updateBroker(broker) {
  return function (dispatch) {
    return brokerApi.updateBroker(broker).then(responseBroker => {
      dispatch(updateBrokerSuccess(responseBroker.broker));
    }).catch(error => {
      throw(error);
    });
  };
}

export function createBroker(broker) {
  return function (dispatch) {
    return brokerApi.createBroker(broker).then(responseBroker => {
      dispatch(createBrokerSuccess(responseBroker.broker));
      return responseBroker;
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteBroker(broker) {
  return function(dispatch) {
    return brokerApi.deleteBroker(broker).then(() => {
      console.log(`Deleted ${broker.id}`)
      dispatch(deleteBrokerSuccess(broker));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}







