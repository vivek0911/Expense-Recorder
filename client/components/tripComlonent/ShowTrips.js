import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, FieldInput, Button } from '../uiKit/UIKit';
import asyncActions from '../../actions/asyncActions';
import './ShowTrips.scss';

class ShowTrips extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(asyncActions.getAllTrips());
  }
  onDelete(tripId) {
    this.props.dispatch(asyncActions.deleteTrip(tripId));
  }
  onEdit(tripId) {
    this.setState({ open: tripId });
  }
  onChange(v, path) {
    const updatedValues = _.cloneDeep(this.state.open);
    _.set(updatedValues, path, v);
    this.setState({ open: updatedValues });
  }
  onSubmit(e) {
    e.preventDefault();
    const obj = {
      startDate: new Date(this.state.startDate),
      endDate: new Date(this.state.endDate),
      title: this.state.title,
    };
    console.log(obj.startDate);
    // this.props.dispatch(asyncActions.addTrip(obj));
  }
  renderModal() {
    const { open } = this.state;
    return (
      <Modal style={{ padding: '0.7rem' }} onClose={() => this.setState({ open: false })}>
        <form className="addtrip-form" onSubmit={e => this.onSubmit(e)}>
          <FieldInput value={open.title} onChange={v => this.onChange(v, 'title')} placeholder="Change Title" look="border" style={{ marginBottom: '30px' }} />
          <FieldInput value={moment(open.startDate).format('YYYY-MM-DD')} onChange={v => this.onChange(v, 'startDate')} placeholder="Change Start date YYYY-MM-DD" look="border" style={{ marginBottom: '30px' }} />
          <FieldInput value={moment(open.endDate).format('YYYY-MM-DD')} onChange={v => this.onChange(v, 'endDate')} placeholder="Change End date YYYY-MM-DD" look="border" style={{ marginBottom: '30px' }} />
          <Button type="submit" className="button btn-pink" style={{ height: '35px' }}>Update Trip</Button>
        </form>
      </Modal>
    );
  }
  render() {
    const { allTrips } = this.props;
    const { open } = this.state;
    return (
      <div className="show-trips-wrap" style={{ height: '100vh' }}>
        {
          allTrips.map((trip, key) => (
            <div className="trip mb-4" key={key}>
              <span>{trip.title}</span>
              <span onClick={() => this.onEdit(trip)}>Edit</span>
              <span onClick={() => this.onDelete(trip._id)}>Delete</span>
            </div>
          ))
        }
        {open && this.renderModal()}
      </div>
    );
  }
}

ShowTrips.defaultProps = {
  allTrips: [],
};
ShowTrips.propTypes = {
  dispatch: PropTypes.func.isRequired,
  allTrips: PropTypes.array,
};

const select = state => ({ allTrips: state.tripReducer.allTrips });
export default connect(select)(ShowTrips);
