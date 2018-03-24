import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import asyncActions from '../../actions/asyncActions';
import Header from '../header/Header';
import AddTrip from '../tripComlonent/AddTrip';
import ShowTrips from '../tripComlonent/ShowTrips';
import ShowExpenses from '../expenseComponent/ShowExpenses';
import './Dashboard.scss';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="dash-wrap">
        <Header />
        <div className="trip-expe-contain d-flex flex-row">
          <div className="pt-5 col-3">
            <AddTrip />
          </div>
          <div className="pt-5 col-5">
            <ShowTrips />
          </div>
          <div className="pt-5 col-4">
            {!_.isEmpty(this.props.selectedTrip) && <ShowExpenses />}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.defaultProps = {
  selectedTrip: {},
};
Dashboard.propTypes = {
  selectedTrip: PropTypes.object,
};

const select = state => ({ selectedTrip: state.tripReducer.toJS().selectedTrip });
export default connect(select)(Dashboard);
