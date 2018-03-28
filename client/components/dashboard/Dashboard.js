import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
// import _ from 'lodash';
import Header from '../header/Header';
import AddTrip from '../tripComponent/AddTrip';
import UpdateTrip from '../tripComponent/UpdateTrip';
import ShowTrips from '../tripComponent/ShowTrips2';
import './Dashboard.scss';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { match } = this.props;
    return (
      <div className="dash-wrap">
        <Header />
        <div className="trip-expe-contain mt-4">
          <Route exact path={match.url} component={ShowTrips} />
          <Route exact path={`${match.url}/addtrip`} component={AddTrip} />
          <Route
            exact path={`${match.url}/trip/:id/update`} render={props => <UpdateTrip trip={props.location.state.trip} />}
          />
        </div>
      </div>
    );
  }
}

Dashboard.defaultProps = {
  match: {},
};
Dashboard.propTypes = {
  match: PropTypes.object,
};

const select = state => state;
export default connect(select)(Dashboard);
