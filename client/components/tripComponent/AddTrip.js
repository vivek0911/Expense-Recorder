import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import asyncActions from '../../actions/asyncActions';
import { Button, FieldInput, FieldDatePicker, FieldSelect } from '../uiKit/UIKit';
import Data from '../../constants/Data.json';
import './AddTrip.scss';

class AddTrip extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      type: '',
      startDate: '',
      endDate: '',
    };
  }
  onChange(v, field) {
    const value = (field === 'startDate' || field === 'startDate') && Moment(v).isValid() ? Moment(v).toDate() : v;
    this.setState({ [field]: value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.dispatch(asyncActions.addTrip(this.state))
    .then(x => x.payload._id && this.props.history.push('/dashboard'));
  }
  render() {
    const { title, type, startDate, endDate } = this.state;
    return (
      <form className="addtrip-form" onSubmit={e => this.onSubmit(e)}>
        <h3 className="mb-3">Add New Trip</h3>
        <FieldInput value={title} onChange={v => this.onChange(v, 'title')} placeholder="Title of your trip" look="border" style={{ marginBottom: '30px' }} />
        <FieldSelect value={type} onChange={v => this.onChange(v, 'type')} options={Data.tripType} placeholder="Choose type" height="35px" style={{ marginBottom: '30px' }} />
        <FieldDatePicker value={startDate} onChange={v => this.onChange(v, 'startDate')} placeholder="Start date" style={{ marginBottom: '30px' }} />
        <FieldDatePicker value={endDate} onChange={v => this.onChange(v, 'endDate')} placeholder="End date" style={{ marginBottom: '30px' }} />
        <Button type="submit" disabled={_.isEmpty(title) || _.isEmpty(type)} className="button btn-blue" style={{ height: '35px' }}>Add Trip</Button>
      </form>
    );
  }
}

AddTrip.defaultProps = {
  dispatch: () => {},
  history: {},
};
AddTrip.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

const select = state => state;
export default withRouter(connect(select)(AddTrip));
