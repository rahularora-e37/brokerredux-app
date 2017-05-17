import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BrokerList from './BrokerList';
import NewBrokerPage from './NewBrokerPage';
import * as actions from '../../actions/brokerActions'

class BrokersPage extends React.Component {
  componentWillMount() {
    if (this.props.brokers[0].id == '') {
      this.props.actions.loadBrokers();
    }
  }
  render() {
    const brokers = this.props.brokers;
    return (
      <div className="col-md-12">
        <h1>Brokers <Link to={'/brokers/new'} className="btn btn-primary">+ broker</Link></h1>
        <div className="col-md-4">
          <BrokerList brokers={brokers} />
        </div>
        <div className="col-md-8">
          {this.props.children}
        </div>
      </div>
    );
  }
}

BrokersPage.propTypes = {
  brokers: PropTypes.array.isRequired,
  children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  if (state.brokers.length > 0) {
    return {
      brokers: state.brokers
    };
  } else {
    return {
      brokers: [{id: '', name: '', street_address: '', city: '', state: '', zipcode: '', factor_rate: '', hobbies: []}]
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(BrokersPage);





