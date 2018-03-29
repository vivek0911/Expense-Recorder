import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Header from '../header/Header';
import TripDetail from '../tripComponent/TripDetail';
import TripExpenses from './TripExpenses';
import AddExpense from './AddExpense';
import UpdateExpense from './UpdateExpense';
import './TripExpensePage.scss';

class TripExpensePage extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { trip, expense, totalExp, match } = this.props;
    return (
      <div className="trip-expense-wrap">
        <Header />
        <div className="trip-expe pb-4 px-5" style={{ paddingTop: '80px' }}>
          <div className="trip-detail-wrap p-2 mr-5"><TripDetail {...{ trip, totalExp }} /></div>
          <div className="trip-expense-wrap">
            <Route exact path={match.url} render={() => <TripExpenses trip={trip} />} />
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
  totalExp: 0,
  match: {},
};
TripExpensePage.propTypes = {
  dispatch: PropTypes.func,
  trip: PropTypes.object,
  expense: PropTypes.object,
  totalExp: PropTypes.number,
  match: PropTypes.object,
};

export default TripExpensePage;
