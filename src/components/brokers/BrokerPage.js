import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as brokerActions from '../../actions/brokerActions';
import BrokerForm from './BrokerForm';
import {browserHistory} from 'react-router';
// import toastr from 'toastr'; 

class BrokerPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      broker: this.props.broker,
      checkBoxHobbies: props.checkBoxHobbies,
      saving: false,
      isEditing: false
    };
    this.saveBroker = this.saveBroker.bind(this);
    this.updateBrokerState = this.updateBrokerState.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteBroker = this.deleteBroker.bind(this);
    this.redirect = this.redirect.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.broker.id != nextProps.broker.id) {
      this.setState({broker: nextProps.broker});
    }
    if (this.props.checkBoxHobbies.length < nextProps.checkBoxHobbies.length) {
      this.setState({brokerHobbies: nextProps.brokerHobbies, checkBoxHobbies: nextProps.checkBoxHobbies});
    }

    this.setState({saving: false, isEditing: false});
  }

  toggleEdit() {
    this.setState({isEditing: true});
  }

  updateBrokerHobbies(event) {
    const broker = this.state.broker;
    const hobbyId = event.target.value;
    const hobby = this.state.checkBoxHobbies.filter(hobby => hobby.id == hobbyId)[0];
    const checked = !hobby.checked;
    hobby['checked'] = !hobby.checked;
    if (checked) {
      broker.hobby_ids.push(hobby.id);
    } else {  
      broker.hobby_ids.splice(broker.hobby_ids.indexOf(hobby.id));
    }
    this.setState({broker: broker});

  }

  updateBrokerState(event) {
    const field = event.target.name;
    const broker = this.state.broker;
    broker[field] = event.target.value;
    return this.setState({broker: broker});
  }

  saveBroker(event) {
    event.preventDefault();
    this.setState({saving: true});
    this.props.actions.updateBroker(this.state.broker);

  } 

  deleteBroker(event) {
    this.props.actions.deleteBroker(this.state.broker)
  }

  redirect() {
    browserHistory.push('/brokers');
  }

  render() {
    if (this.state.isEditing) {
      return (
      <div>
        <h1>edit broker</h1>
        <BrokerForm 
          broker={this.state.broker} 
          hobbies={this.state.checkBoxHobbies}
          onSave={this.saveBroker} 
          onChange={this.updateBrokerState} 
          onHobbyChange={this.updateBrokerHobbies}
          saving={this.state.saving}/> 
      </div>
      )
    }
    return (
      <div className="col-md-8 col-md-offset-2">
        <h1>{this.state.broker.name}</h1>
        <p>Street Address: {this.state.broker.street_address}</p>
        <p>City: {this.state.broker.city}</p>
        <p>State: {this.state.broker.state}</p>
        <p>ZipCode: {this.state.broker.zipcode}</p>
        <p>Factor Rate: {this.state.broker.factor_rate}</p>
        <button onClick={this.toggleEdit} className="btn btn-default  ">edit</button>
        <button onClick={this.deleteBroker} className="btn btn-default  ">delete</button>
      </div>
    );
  }
}


BrokerPage.propTypes = {
  broker: PropTypes.object.isRequired,
  brokerHobbies: PropTypes.array.isRequired,
  checkBoxHobbies: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function getBrokerById(brokers, id) {
  let broker = brokers.find(broker => broker.id == id)
  return Object.assign({}, broker)
}

function hobbiesForCheckBoxes(hobbies, broker=null) {
  return hobbies.map(hobby => {
    if (broker && broker.hobby_ids.filter(hobbyId => hobbyId == hobby.id).length > 0) {
      hobby['checked'] = true;
    } else {
      hobby['checked'] = false;
    }
    return hobby;
  });
}

function collectBrokerHobbies(hobbies, broker) {
  let selected = hobbies.map(hobby => {
    if (broker.hobby_ids.filter(hobbyId => hobbyId == hobby.id).length > 0) {
      return hobby;
    }
  })
  return selected.filter(el => el != undefined)
}

function mapStateToProps(state, ownProps) {
  const stateHobbies = Object.assign([], state.hobbies)
  let checkBoxHobbies = [];
  let brokerHobbies = [];
  let broker = {name: '', street_address: '', city: '', state: '', zipcode: '', factor_rate: '', hobby_ids: []};
  const brokerId = ownProps.params.id;
  if (brokerId && state.brokers.length > 0 ) {
    broker = getBrokerById(state.brokers, ownProps.params.id);
    if (broker.id) {
      checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies, broker);
      brokerHobbies = collectBrokerHobbies(stateHobbies, broker);
    } else {
      checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies)
    }
  } 
    return {broker: broker, checkBoxHobbies: checkBoxHobbies, brokerHobbies: brokerHobbies};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(brokerActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(BrokerPage);

// connect:
// + will invoke mapDispatchToProps, with an argument of the store's dispatch function
// + it has access to the store, b/c you passed store in via the provider 
// + bindActionCreators will take your collection of action creator functions
// + iterate over it, wrap each AC function in store.dispatch(AC function)
// + make them available to your component as this.props.actions = {name of an action: store.dispatch(ac function)}







