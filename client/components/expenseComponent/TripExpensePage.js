import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Request from 'axios';
import Header from '../header/Header';
import syncActions from '../../actions/syncActions';
import TripDetail from '../tripComponent/TripDetail';
import TripExpenses from './TripExpenses';
import AddExpense from './AddExpense';
import UpdateExpense from './UpdateExpense';
import './TripExpensePage.scss';

class TripExpensePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    const api = 'http://data.fixer.io/api/latest?access_key=77e7cfbf1b3406a82f536052133b139f';
    Request.get(api).then(d => this.props.dispatch(syncActions.currencyRates(d.data.rates)));
  }
  render() {
    const { trip, expense, totalExp, match } = this.props;
    return (
      <div className="trip-expense-wrap">
        <Header />
        <div className="trip-expe pb-4 px-5" style={{ paddingTop: '80px' }}>
          <div className="trip-detail-wrap p-3 mr-5"><TripDetail {...{ trip, totalExp }} /></div>
          <div className="trip-expense-wrap">
            <Route exact path={match.url} render={() => <TripExpenses {...{ trip }} />} />
            <Route exact path={`${match.url}/addExpense`} render={() => <AddExpense {...{ trip, totalExp }} />} />
            <Route exact path={`${match.url}/updateExpense/:expId`} render={() => <UpdateExpense {...{ expense, trip }} />} />
          </div>
        </div>
      </div>
    );
  }
}

TripExpensePage.defaultProps = {
  dispatch: () => {},
  trip: {},
  expense: {},
  totalExp: '',
  match: {},
};
TripExpensePage.propTypes = {
  dispatch: PropTypes.func,
  trip: PropTypes.object,
  expense: PropTypes.object,
  totalExp: PropTypes.string,
  match: PropTypes.object,
};

const select = state => state;
export default connect(select)(TripExpensePage);
