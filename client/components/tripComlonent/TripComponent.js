import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Request from 'axios';
import asyncActions from '../../actions/asyncActions';

class TripComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    this.props.dispatch(asyncActions.getAllTrips());
  }
  currencyConversion() {
    // price, base='INR', to
    const api = 'http://data.fixer.io/api/latest?access_key=77e7cfbf1b3406a82f536052133b139f';
    Request.get(api).then(d => {
      Object.keys(d.data.rates).forEach(function(key,index) {
        console.log(`{ "value": "${key}", "label": "${key}" },`);
      });
    });
  }
  render() {
    console.log('trip component');
    return (
      <div className="trip-compo" style={{ height: '100vh' }}>
        <div><button onClick={() => this.currencyConversion()}>Add trip</button></div>
      </div>
    );
  }
}

TripComponent.defualtProps = {};
TripComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const select = state => state;
export default connect(select)(TripComponent);
