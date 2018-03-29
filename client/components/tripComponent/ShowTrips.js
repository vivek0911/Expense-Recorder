import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Request from 'axios';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { Button } from '../uiKit/UIKit';
import asyncActions from '../../actions/asyncActions';
import syncActions from '../../actions/syncActions';
import './ShowTrips.scss';

class ShowTrips extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    this.props.dispatch(asyncActions.getAllTrips());
    this.props.dispatch(asyncActions.getAllExpenses());
    const api = 'http://data.fixer.io/api/latest?access_key=77e7cfbf1b3406a82f536052133b139f';
    Request.get(api).then(d => this.props.dispatch(syncActions.currencyRates(d.data.rates)));
  }

  onSearch(text) {
    this.props.dispatch(syncActions.filterTrips({ text }));
  }

  onDelete(tripId) {
    const x = window.confirm('Are you sure you want to delete?');
    if (x) this.props.dispatch(asyncActions.deleteTrip(tripId));
  }

  totalExpenseOfTrip(tripId) {
    const { allExpenses, rates } = this.props;
    const expenses = (allExpenses || []).filter(expe => expe.tripId === tripId);
    let total = 0;
    for (let i = 0; i < expenses.length; i += 1) {
      if (expenses[i].baseCurrency === 'INR') {
        total += _.toNumber(expenses[i].amount);
      } else {
        const base = expenses[i].baseCurrency;
        const newAmt = ((rates.INR / rates[base]) * expenses[i].amount).toFixed(2);
        total += _.toNumber(newAmt);
      }
    }
    return total.toFixed(2);
  }

  render() {
    const { allTrips, history } = this.props;
    const firstrow = ['Title', 'Type', 'Start From', 'End To', 'Total Expense', ''];
    return (
      allTrips.length === 0
      ?
        <div className="welcome-msg">
          <div>Welcome to Expense Recorder</div>
          <div>Our web platform allows user to create and manage trips along with its expenses</div>
          <div>Let's get started by <Link to="/dashboard/addtrip">adding trip</Link></div>
        </div>
      :
        <div className="show-trips-wrap">
          <div className="st-top-bar d-flex justify-content-between mb-3">
            <span style={{ color: '#000', fontSize: '1.5rem', fontWeight: 'bold' }}>All Trips</span>
            <div className="d-flex">
              <input
                type="search" placeholder="Search Trip by Title" className="mb-2"
                onChange={e => this.onSearch(e.target.value)}
              />
              <Button onClick={() => {}} className="button btn-blue ml-4 p-2" style={{ height: '35px', borderRadius: '3px' }}><Link to="/dashboard/addtrip">Add Trip</Link></Button>
            </div>
          </div>
          <div className="st-list">
            <div className="first-row common">
              {
                firstrow.map((i, key) => (
                  <span key={key}>{i}</span>
                ))
              }
            </div>
            <hr />
            {
              allTrips.map((trip, key) => (
                <div key={key}>
                  <div className="triplist-row common">
                    <span>{trip.title}</span>
                    <span>{trip.type}</span>
                    <span>{Moment(trip.startDate).isValid() ? Moment(trip.startDate).format('DD-MM-YYYY') : 'NA'}</span>
                    <span>{Moment(trip.endDate).isValid() ? Moment(trip.endDate).format('DD-MM-YYYY') : 'NA'}</span>
                    <span>{this.totalExpenseOfTrip(trip._id)}&nbsp;INR</span>
                    <span className="d-flex align-items-center justify-content-between">
                      <Button onClick={() => history.push({ pathname: `/trip/${trip._id}`, state: { trip, totalExp: this.totalExpenseOfTrip(trip._id) } })} className="button btn-blue" style={{ height: '35px', borderRadius: '3px', width: '40%' }}>View</Button>
                      <i className="fa fa-pencil" onClick={() => history.push({ pathname: `/dashboard/trip/${trip._id}/update`, state: { trip } })} />
                      <i className="fa fa-trash" onClick={() => this.onDelete(trip._id)} />
                    </span>
                  </div>
                  <hr />
                </div>
              ))
            }
          </div>
        </div>
    );
  }
}

ShowTrips.defaultProps = {
  allTrips: [],
  allExpenses: [],
  history: {},
  rates: {},
};
ShowTrips.propTypes = {
  dispatch: PropTypes.func.isRequired,
  allTrips: PropTypes.array,
  allExpenses: PropTypes.array,
  history: PropTypes.object,
  rates: PropTypes.object,
};

const select = state => ({ allTrips: state.tripReducer.allTrips, allExpenses: state.expenseReducer.allExpenses, rates: state.ratesReducer.rates });
export default withRouter(connect(select)(ShowTrips));
