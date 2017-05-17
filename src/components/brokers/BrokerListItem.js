import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import BrokerPage from './BrokerPage';

const BrokerListItem = ({broker}) => {
  return (
    <li className="list-group-item"><Link to={'/brokers/' + broker.id}>{broker.name}</Link></li>
  );
};

BrokerListItem.propTypes = {
  broker: PropTypes.object.isRequired
};

export default BrokerListItem;
