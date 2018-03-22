import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import asyncActions from '../../actions/asyncActions';
import Header from '../header/Header';
import AddTrip from '../tripComlonent/AddTrip';
import ShowTrips from '../tripComlonent/ShowTrips';
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
          <div className="trip-part pt-5 col-3">
            <AddTrip />
          </div>
          <div className="trips-list pt-5 col-9">
            <ShowTrips />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.defaultProps = {};
Dashboard.propTypes = {
};

const select = state => state;
export default connect(select)(Dashboard);
