import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import asyncActions from '../../actions/asyncActions';
import { Button, FieldInput, FieldSelect } from '../uiKit/UIKit';
import Data from '../../constants/Data.json';
import './AddExpense.scss';

class AddExpense extends Component {
  constructor() {
    super();
    this.state = {
      category: '',
      amount: '',
      baseCurrency: 'INR',
      discription: '',
    };
  }
  onChange(v, field) {
    this.setState({ [field]: v });
  }

  onSubmit(e) {
    e.preventDefault();
    const exp = _.assign({}, this.state, { date: Moment().toDate(), tripId: this.props.selectedTrip._id });
    this.props.dispatch(asyncActions.addExpense(exp))
    .then(x => x.payload._id && this.setState({ category: '', amount: '', discription: '' }));
  }
  render() {
    const { category, amount, discription } = this.state;
    const { style } = this.props;
    return (
      <form className="add-expense-form" onSubmit={e => this.onSubmit(e)} style={style}>
        <FieldSelect value={category} onChange={v => this.onChange(v, 'category')} options={Data.category} placeholder="Select category" height="35px" style={{ marginBottom: '30px' }} />
        <FieldInput value={amount} onChange={v => this.onChange(v, 'amount')} placeholder="Amount in INR" look="border" style={{ marginBottom: '30px' }} />
        <FieldInput value={discription} onChange={v => this.onChange(v, 'discription')} placeholder="Discription" look="border" style={{ marginBottom: '30px' }} />
        <Button type="submit" disabled={_.isEmpty(category) || _.isEmpty(amount)} className="button btn-pink" style={{ height: '35px' }}>Add Expense</Button>
      </form>
    );
  }
}

AddExpense.defaultProps = {
  dispatch: () => {},
  style: {},
  selectedTrip: {},
};
AddExpense.propTypes = {
  dispatch: PropTypes.func,
  style: PropTypes.object,
  selectedTrip: PropTypes.object,
};

const select = state => ({ selectedTrip: state.tripReducer.toJS().selectedTrip });
export default connect(select)(AddExpense);
