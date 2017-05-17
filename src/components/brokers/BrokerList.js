import React, {PropTypes} from 'react';
import BrokerListItem from './BrokerListItem';
import {Link} from 'react-router';


const BrokerList = ({brokers}) => {
  return (
      <ul className="list-group">
        {brokers.map(broker => 
           <li className="list-group-item" key={broker.id}><Link to={'/brokers/' + broker.id}>{broker.name}</Link></li>
        )}
      </ul>
  );
};

BrokerList.propTypes = {
  brokers: PropTypes.array.isRequired
};

export default BrokerList;