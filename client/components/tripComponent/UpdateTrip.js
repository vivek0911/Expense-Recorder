import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import asyncActions from '../../actions/asyncActions';
import { Button, FieldInput, FieldDatePicker, FieldSelect, Modal } from '../uiKit/UIKit';
import Data from '../../constants/Data.json';
import './UpdateTrip.scss';

class UpdateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.trip.title,
      type: props.trip.type,
      startDate: props.trip.startDate,
      endDate: props.trip.endDate,
    };
  }
  onChange(v, field) {
    const value = (field === 'startDate' || field === 'startDate') && Moment(v).isValid() ? Moment(v).toDate() : v;
    this.setState({ [field]: value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.dispatch(asyncActions.updateTrip(this.state, this.props.trip._id))
    .then(x => x.payload._id && this.props.history.push('/dashboard'));
  }
  render() {
    const { title, type, startDate, endDate } = this.state;
    return (
      <Modal style={{ padding: '2rem' }} onClose={() => this.props.history.push('/dashboard')}>
        <form className="update-trip" onSubmit={e => this.onSubmit(e)}>
          <FieldInput value={title} onChange={v => this.onChange(v, 'title')} placeholder="Title of your trip" look="border" style={{ marginBottom: '30px' }} />
          <FieldSelect value={type} onChange={v => this.onChange(v, 'type')} options={Data.tripType} placeholder="Choose type" height="35px" style={{ marginBottom: '30px' }} />
          <FieldDatePicker value={startDate} onChange={v => this.onChange(v, 'startDate')} placeholder="Start date" style={{ marginBottom: '30px' }} />
          <FieldDatePicker value={endDate} onChange={v => this.onChange(v, 'endDate')} placeholder="End date" style={{ marginBottom: '30px' }} />
          <div className="d-flex justify-content-between">
            <Button className="button btn-white" onClick={() => this.props.history.push('/dashboard')} style={{ height: '35px', width: '40%' }}>Cancel</Button>
            <Button type="submit" disabled={_.isEmpty(title) || _.isEmpty(type)} className="button btn-blue" style={{ height: '35px', width: '40%' }}>Save</Button>
          </div>
        </form>
      </Modal>
    );
  }
}

UpdateTrip.defaultProps = {
  dispatch: () => {},
  history: {},
  trip: {},
};
UpdateTrip.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  trip: PropTypes.object,
};

const select = state => state;
export default withRouter(connect(select)(UpdateTrip));
