import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import asyncActions from '../../actions/asyncActions';
import { Button, FieldInput, FieldSelect, FieldDatePicker } from '../uiKit/UIKit';
import Data from '../../constants/Data.json';
import './AddExpense.scss';

class AddExpense extends Component {
  constructor() {
    super();
    this.state = {
      category: '',
      amount: '',
      baseCurrency: '',
      discription: '',
      date: '',
    };
  }
  onChange(v, field) {
    const value = field === 'date' && Moment(v).isValid() ? Moment(v).toDate() : v;
    this.setState({ [field]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    const exp = _.assign({}, this.state, { tripId: this.props.selectedTrip._id });
    this.props.dispatch(asyncActions.addExpense(exp))
    .then(x => x.payload._id && this.setState({ category: '', amount: '', baseCurrency: '', date: '', discription: '' }));
  }
  render() {
    const { category, amount, baseCurrency, date, discription } = this.state;
    const { style } = this.props;
    const disabled = _.isEmpty(category) || _.isEmpty(amount) || _.isEmpty(baseCurrency) || !Moment(date).isValid();
    return (
      <form className="add-expense-form" onSubmit={e => this.onSubmit(e)} style={style}>
        <FieldSelect value={category} onChange={v => this.onChange(v, 'category')} options={Data.category} placeholder="Select category" height="35px" style={{ marginBottom: '30px' }} />
        <div className="d-flex justify-content-between">
          <FieldInput value={amount} onChange={v => this.onChange(v, 'amount')} placeholder="Amount" look="border" style={{ marginBottom: '30px', width: '40%' }} />
          <FieldSelect value={baseCurrency} onChange={v => this.onChange(v, 'baseCurrency')} options={Data.currency} placeholder="Currency" height="10px" style={{ width: '40%' }} />
        </div>
        <FieldDatePicker value={date} onChange={v => this.onChange(v, 'date')} placeholder="Date" style={{ marginBottom: '30px' }} />
        <FieldInput value={discription} onChange={v => this.onChange(v, 'discription')} placeholder="Discription" look="border" style={{ marginBottom: '30px' }} />
        <Button type="submit" disabled={disabled} className="button btn-pink" style={{ height: '35px' }}>Add Expense</Button>
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

const select = state => ({ selectedTrip: state.tripReducer.selectedTrip });
export default connect(select)(AddExpense);
