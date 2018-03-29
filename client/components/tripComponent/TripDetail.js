import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '../uiKit/UIKit';
import './TripDetail.scss';

const TripDetail = ({ trip, totalExp }) => (
  <div className="trip-details">
    <div className="te-left pr-2">
      <h4 className="mb-4">{trip.title}</h4>
      <div className="trip-type py-1 mb-4"><span>Trip Type&nbsp;:&nbsp;</span><span>{trip.type}</span></div>
      <div className="trip-dates mb-4">
        <div className="date">
          <span>Departure Date</span>
          <span>{Moment(trip.startDate).isValid() ? Moment(trip.startDate).format('DD-MM-YYYY') : 'You didn\'t mention'}</span>
        </div>
        <div className="date">
          <span>Arrival Date</span>
          <span>{Moment(trip.endDate).isValid() ? Moment(trip.endDate).format('DD-MM-YYYY') : 'You didn\'t mention'}</span>
        </div>
      </div>
      <Button className="button btn-blue" style={{ height: '35px', borderRadius: '3px' }}><Link to={{ pathname: `/trip/${trip._id}/addExpense`, state: { trip } }}>Add Expense</Link></Button>
    </div>
    <div className="te-right px-3 pb-3">
      <div className="total-expe"><span>Total Expense</span><span>&#8377;&nbsp;{totalExp}</span></div>
    </div>
  </div>
);

TripDetail.defaultProps = {
  trip: {},
  totalExp: 0,
};
TripDetail.propTypes = {
  trip: PropTypes.object,
  totalExp: PropTypes.number,
};
export default TripDetail;
