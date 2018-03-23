import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
// import _ from 'lodash';
import PropTypes from 'prop-types';
import Request from 'axios';
import asyncActions from '../../actions/asyncActions';
import syncActions from '../../actions/syncActions';
import { FieldSelect } from '../uiKit/UIKit';
import Data from '../../constants/Data.json';
import './ShowExpenses.scss';

class ShowExpenses extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
    this.props.dispatch(asyncActions.getAllExpenses());
  }

  onChange(v, field, exp) {
    const api = 'http://data.fixer.io/api/latest?access_key=77e7cfbf1b3406a82f536052133b139f';
    Request.get(api).then((d) => {
      const base = exp.baseCurrency;
      const newAmt = (d.data.rates[v] / d.data.rates[base]) * exp.amount;
      this.props.dispatch(syncActions.convertCurrencyOfExpense({ id: exp._id, curr: v, amt: newAmt }));
    });
  }
  render() {
    const { selectedTrip, allExpe } = this.props;
    return (
      <div className="show-expense-wrap">
        <h3>Expenses of {selectedTrip.title}</h3>
        {
          (allExpe || []).filter(expe => expe.tripId === selectedTrip._id).map((exp, key) => (
            <div className="expense p-2 mb-4" key={key}>
              <span className="mb-2">Category: {exp.category}</span>
              <div className="d-flex align-items-center mb-2">
                <span className="mr-3">Amount: {(exp.amount).toFixed(2)}</span>
                <FieldSelect value={exp.baseCurrency} onChange={v => this.onChange(v, 'baseCurrency', exp)} options={Data.currency} height="10px" style={{ width: '20%' }} />
              </div>
              <span className="mb-2">Date: {Moment(exp.date).format('DD-MM-YYYY')}</span>
              <span className="mb-2">Discription: {exp.discription}</span>
            </div>
          ))
        }
      </div>
    );
  }
}

ShowExpenses.defaultProps = {
  dispatch: () => {},
  selectedTrip: {},
  allExpe: [],
};
ShowExpenses.propTypes = {
  dispatch: PropTypes.func,
  selectedTrip: PropTypes.object,
  allExpe: PropTypes.array,
};

const select = state => ({ selectedTrip: state.tripReducer.selectedTrip, allExpe: state.expenseReducer.allExpenses });
export default connect(select)(ShowExpenses);
