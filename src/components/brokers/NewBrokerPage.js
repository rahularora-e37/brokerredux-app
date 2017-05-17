import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as courseActions from '../../actions/brokerActions';
import BrokerForm from './BrokerForm';


class NewBrokerPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      broker: {name: '', street_address: '', city: '', state: '', zipcode: '', factor_rate: '', hobby_ids: []},
      saving: false
    };
    this.saveBroker = this.saveBroker.bind(this);
    this.updateBrokerHobbies = this.updateBrokerHobbies.bind(this);
    this.updateBrokerState = this.updateBrokerState.bind(this);
  }

  updateBrokerHobbies(event) {
    const broker = this.state.broker;
    const hobbyId = event.target.value;
    const hobby = this.props.checkBoxHobbies.filter(hobby => hobby.id == hobbyId)[0];
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
    this.props.actions.createBroker(this.state.broker)
  }
  
  render() {
    return (
      <div>
        <h1>new broker</h1>
        <BrokerForm 
          broker={this.state.broker} 
          hobbies={this.props.checkBoxHobbies}
          onSave={this.saveBroker}
          onChange={this.updateBrokerState}
          onHobbyChange={this.updateBrokerHobbies}/>
      </div>
    );
  }
}

function hobbiesForCheckBoxes(hobbies) {
  return hobbies.map(hobby => {
    hobby['checked'] = false;
    return hobby;
  });
}

NewBrokerPage.propTypes = {
  checkBoxHobbies: PropTypes.array.isRequired, 
  actions: PropTypes.object.isRequired
};



function mapStateToProps(state, ownProps) {
  let checkBoxHobbies = [];

  return {
    checkBoxHobbies: checkBoxHobbies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(NewBrokerPage);





