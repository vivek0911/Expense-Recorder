import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Request from 'axios';
import Dropzone from 'react-dropzone';
import Header from '../header/Header';
import asyncActions from '../../actions/asyncActions';
import syncActions from '../../actions/syncActions';
import { FieldSelect, Button } from '../uiKit/UIKit';
import Data from '../../constants/Data.json';
import './TripExpense.scss';

class TripExpense extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { trip, totalExp } = this.props;
    return (
      <div className="trip-expense-wrap">
        <Header />
        <div className="trip-expe py-4 px-5">
          <div className="trip-details p-2">
            <div className="te-left pr-2">
              <h4 className="mb-4">{trip.title}</h4>
              <div className="trip-type py-1 mb-4"><span>Trip Type&nbsp;:&nbsp;</span><span>{trip.type}</span></div>
              <div className="trip-dates">
                <div className="date">
                  <span>Departure Date</span>
                  <span>{Moment(trip.startDate).isValid() ? Moment(trip.startDate).format('DD-MM-YYYY') : 'You didn\'t mention'}</span>
                </div>
                <div className="date">
                  <span>Arrival Date</span>
                  <span>{Moment(trip.endDate).isValid() ? Moment(trip.endDate).format('DD-MM-YYYY') : 'You didn\'t mention'}</span>
                </div>
              </div>
            </div>
            <div className="te-right p-3">
              <div className="total-expe"><span>Total Expense</span><span>&#8377;&nbsp;{totalExp}</span></div>
              <Button className="button btn-blue" style={{ height: '35px', borderRadius: '3px' }}>Add Expense</Button>
            </div>
          </div>
          <div className="trip-expenses">All expenses</div>
        </div>
      </div>
    );
  }
}

TripExpense.defaultProps = {
  dispatch: () => {},
  trip: {},
  totalExp: 0,
};
TripExpense.propTypes = {
  dispatch: PropTypes.func,
  trip: PropTypes.object,
  totalExp: PropTypes.number,
};

const select = state => state;
export default connect(select)(TripExpense);
