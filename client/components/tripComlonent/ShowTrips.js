import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { Modal, FieldInput, Button, FieldDatePicker } from '../uiKit/UIKit';
import asyncActions from '../../actions/asyncActions';
import syncActions from '../../actions/syncActions';
import AddExpense from '../expenseComponent/AddExpense';
import './ShowTrips.scss';

class ShowTrips extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      selectedTrip: '',
      addExpense: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(asyncActions.getAllTrips());
  }
  tripSelected(trip) {
    if (this.props.selectedTrip._id !== trip._id) this.props.dispatch(syncActions.tripSelected(trip));
    this.setState({ selectedTrip: trip._id === this.state.selectedTrip._id ? '' : trip });
  }
  onDelete(tripId) {
    const x = window.confirm('Are you sure you want to delete?');
    if (x) this.props.dispatch(asyncActions.deleteTrip(tripId));
  }
  onEdit(trip) {
    this.setState({
      open: _.assign({}, trip, { title: trip.title, startDate: Moment(trip.startDate).toDate(), endDate: Moment(trip.endDate).toDate() }),
    });
  }
  onChange(v, path) {
    const value = Moment(v).isValid() ? Moment(v).toDate() : v;
    const updatedValues = _.cloneDeep(this.state.open);
    _.set(updatedValues, path, value);
    this.setState({ open: updatedValues });
  }
  onSubmit(e) {
    e.preventDefault();
    const t = this.state.open;
    this.props.dispatch(asyncActions.updateTrip(t, t._id))
    .then(x => x.payload._id === t._id && this.setState({ open: false }));
  }
  selectedTrip(trip) {
    const { addExpense } = this.state;
    return (
      <div className="trip-detail p-2">
        <div className="dates-wrap p-3">
          <span>Start Date : {Moment(trip.startDate).isValid() ? Moment(trip.startDate).format('DD-MM-YYYY') : 'Not Available'}</span>
          <span>End Date : {Moment(trip.endDate).isValid() ? Moment(trip.endDate).format('DD-MM-YYYY') : 'Not Available'}</span>
        </div>
        { addExpense ? <AddExpense style={{ width: '90%' }} /> : <Button onClick={() => this.setState({ addExpense: true })} className="button btn-pink ml-3" style={{ height: '35px', width: '25%' }}>Add Expense</Button>}
      </div>
    );
  }
  renderModal() {
    const { open } = this.state;
    return (
      <Modal style={{ padding: '2rem' }} onClose={() => this.setState({ open: false })}>
        <form className="addtrip-form" onSubmit={e => this.onSubmit(e)}>
          <FieldInput value={open.title} onChange={v => this.onChange(v, 'title')} placeholder="Change Title" look="border" style={{ marginBottom: '30px' }} />
          <FieldDatePicker value={open.startDate} onChange={v => this.onChange(v, 'startDate')} placeholder="Change Start date" look="border" style={{ marginBottom: '30px' }} />
          <FieldDatePicker value={open.endDate} onChange={v => this.onChange(v, 'endDate')} placeholder="Change End date" look="border" style={{ marginBottom: '30px' }} />
          <Button type="submit" className="button btn-pink" style={{ height: '35px' }}>Save</Button>
        </form>
      </Modal>
    );
  }
  render() {
    const { allTrips } = this.props;
    const { open, selectedTrip } = this.state;
    return (
      <div className="show-trips-wrap p-3">
        {_.isEmpty(allTrips) && <span style={{ fontSize: '2rem', color: '#de6060' }}>No trip is added yet</span>}
        {
          allTrips.map((trip, key) => (
            <div className="triplist mb-4" key={key}>
              <div className="trip mb-2">
                <span onClick={() => this.tripSelected(trip)}>{trip.title}</span>
                <span onClick={() => this.onEdit(trip)}>Edit</span>
                <span onClick={() => this.onDelete(trip._id)}>Delete</span>
              </div>
              { trip._id === selectedTrip._id && this.selectedTrip(selectedTrip) }
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

const select = state => ({ allTrips: state.tripReducer.toJS().allTrips, selectedTrip: state.tripReducer.toJS().selectedTrip });
export default connect(select)(ShowTrips);
