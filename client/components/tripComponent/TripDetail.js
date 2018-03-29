import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, FieldSelect } from '../uiKit/UIKit';
import Data from '../../constants/Data.json';
import './TripDetail.scss';

class TripDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'INR',
      totalExpense: props.totalExp,
      x: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { tripExpe, rates } = nextProps;
    let total = 0;
    for (let i = 0; i < tripExpe.length; i += 1) {
      if (tripExpe[i].baseCurrency === 'INR') {
        total += _.toNumber(tripExpe[i].amount);
      } else {
        const base = tripExpe[i].baseCurrency;
        const newAmt = ((rates.INR / rates[base]) * tripExpe[i].amount).toFixed(2);
        total += _.toNumber(newAmt);
      }
    }
    this.setState({ totalExpense: total.toFixed(2) });
  }
  onChange(v, field) {
    const { totalExpense, currency, x } = this.state;
    const { rates } = this.props;
    const base = currency;
    const newAmt = ((rates[v] / rates[base]) * _.toNumber(totalExpense)).toFixed(2);
    this.setState({ [field]: v, totalExpense: newAmt, x: !x });
  }

  render() {
    const { trip } = this.props;
    const { currency, totalExpense, x } = this.state;
    return (
      <div className="trip-details">
        <div className="title-row">
          <h4 className="mb-4">{trip.title}</h4>
          <div className="tr-right px-3 pb-3">
            <div className="total-expe">
              <span className="title">Total Expense</span>
              <span className="expe-curr">
                <span className="amt">{totalExpense}&nbsp;</span>
                { x ? <span className="curr" onClick={() => this.setState({ x: !x })}>{currency}</span> :
                <FieldSelect value={currency} onChange={v => this.onChange(v, 'currency')} options={Data.currency} />
                }
              </span>
            </div>
          </div>
        </div>
        <div className="bottom-wrap">
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
      </div>
    );
  }
}

TripDetail.defaultProps = {
  trip: {},
  totalExp: '',
  rates: {},
  tripExpe: [],
};
TripDetail.propTypes = {
  trip: PropTypes.object,
  totalExp: PropTypes.string,
  rates: PropTypes.object,
  tripExpe: PropTypes.array,
};

const select = state => ({ tripExpe: state.tripReducer.tripExpenses, rates: state.ratesReducer.rates });
export default connect(select)(TripDetail);
