import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';
import CheckBox from '../common/CheckBox';

class BrokerForm extends React.Component {
  constructor(props) {
    super(props);
    this.makeCheckBoxes = this.makeCheckBoxes.bind(this);
  }

  makeCheckBoxes() {
    return this.props.hobbies.map(hobby => {
      return <CheckBox item={hobby} handleChange={this.props.onHobbyChange} key={hobby.id}/>
    })
  }

  render() {
    const boxes = this.makeCheckBoxes();
    return (
      <div>
        <form>
          <TextInput
            name="name"
            label="name"
            required={true}
            value={this.props.broker.name}
            onChange={this.props.onChange}/>

          {boxes}

          <TextInput
            name="street_address"
            label="street_address"
            required={true}
            value={this.props.broker.street_address}
            onChange={this.props.onChange}/>

          <TextInput
            name="city"
            label="city"
            required={true}
            value={this.props.broker.city}
            onChange={this.props.onChange}/>

          <TextInput
            name="state"
            label="state"
            required={true}
            value={this.props.broker.state}
            onChange={this.props.onChange}/>

          <TextInput
            name="zipcode"
            label="zipcode"
            required={true}
            value={this.props.broker.zipcode}
            onChange={this.props.onChange}/>

          <TextInput
            name="factor_rate"
            label="factor_rate"
            required={true}
            value={this.props.broker.factor_rate}
            onChange={this.props.onChange}/>

          <input
            type="submit"
            disabled={this.props.saving}
            value={this.props.saving ? 'Saving...' : 'Save'}
            className="btn btn-primary"
            onClick={this.props.onSave}/>
        </form>
      </div>
  );
  }
}

BrokerForm.propTypes = {
  broker: React.PropTypes.object.isRequired,
  hobbies: React.PropTypes.array.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool
};

export default BrokerForm;
