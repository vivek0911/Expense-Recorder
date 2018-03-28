import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import asyncActions from '../../actions/asyncActions';
import { Button, FieldInput, FieldDatePicker } from '../uiKit/UIKit';
import './AddTrip.scss';

class AddTrip extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
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
    .then(x => x.payload._id && this.setState({ title: '', startDate: '', endDate: '' }));
  }
  render() {
    const { title, startDate, endDate } = this.state;
    return (
      <form className="addtrip-form" onSubmit={e => this.onSubmit(e)}>
        <FieldInput value={title} onChange={v => this.onChange(v, 'title')} placeholder="Title of your trip" look="border" style={{ marginBottom: '30px' }} />
        <FieldDatePicker value={startDate} onChange={v => this.onChange(v, 'startDate')} placeholder="Start date" style={{ marginBottom: '30px' }} />
        <FieldDatePicker value={endDate} onChange={v => this.onChange(v, 'endDate')} placeholder="End date" style={{ marginBottom: '30px' }} />
        <Button type="submit" disabled={_.isEmpty(title)} className="button btn-pink" style={{ height: '35px' }}>Add Trip</Button>
      </form>
    );
  }
}

AddTrip.defaultProps = {
  dispatch: () => {},
};
AddTrip.propTypes = {
  dispatch: PropTypes.func,
};

const select = state => state;
export default connect(select)(AddTrip);
