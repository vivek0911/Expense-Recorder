import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
      title: '',
      category: '',
      amount: '',
      baseCurrency: '',
      discription: '',
      place: '',
      date: '',
      mot: '',
    };
  }
  onChange(v, field) {
    const value = field === 'date' && Moment(v).isValid() ? Moment(v).toDate() : v;
    this.setState({ [field]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { trip, totalExp } = this.props;
    const exp = _.assign({}, this.state, { tripId: trip._id });
    this.props.dispatch(asyncActions.addExpense(exp))
    .then(x => x.payload._id && this.props.history.push({ pathname: `/trip/${trip._id}`, state: { trip, totalExp } }));
  }
  render() {
    const { title, category, amount, baseCurrency, place, date, discription, mot } = this.state;
    const { style, trip } = this.props;
    const disabled = _.isEmpty(title) || _.isEmpty(category) || _.isEmpty(amount) || _.isEmpty(baseCurrency);
    return (
      <form className="add-expense-form" onSubmit={e => this.onSubmit(e)} style={style}>
        <h5 className="mb-3">Add Expense To <span>{trip.title}</span></h5>
        <FieldInput value={title} onChange={v => this.onChange(v, 'title')} placeholder="Title" look="border" style={{ marginBottom: '25px', height: '35px' }} />
        <FieldSelect value={category} onChange={v => this.onChange(v, 'category')} options={Data.category} placeholder="Select category" height="35px" style={{ marginBottom: '25px' }} />
        { category === 'Transport' && <FieldInput value={mot} onChange={v => this.onChange(v, 'mot')} placeholder="Mode Of Transport (Exa. Flight, Train)" look="border" style={{ marginBottom: '25px' }} />}
        <div className="d-flex justify-content-between" style={{ marginBottom: '25px' }}>
          <FieldInput value={amount} onChange={v => this.onChange(v, 'amount')} placeholder="Amount" look="border" style={{ width: '40%', height: '35px' }} />
          <FieldSelect value={baseCurrency} onChange={v => this.onChange(v, 'baseCurrency')} options={Data.currency} placeholder="Currency" height="35px" style={{ width: '40%' }} />
        </div>
        <div className="d-flex justify-content-between" style={{ marginBottom: '25px' }}>
          <FieldInput value={place} onChange={v => this.onChange(v, 'place')} placeholder="place name" look="border" style={{ width: '40%', height: '35px' }} />
          <FieldDatePicker value={date} onChange={v => this.onChange(v, 'date')} placeholder="Date" style={{ width: '40%', height: '35px' }} />
        </div>
        <FieldInput value={discription} onChange={v => this.onChange(v, 'discription')} placeholder="Add Note" look="border" style={{ marginBottom: '25px', height: '35px' }} />
        <Button type="submit" disabled={disabled} className="button btn-blue" style={{ height: '35px' }}>Add Expense</Button>
      </form>
    );
  }
}

AddExpense.defaultProps = {
  dispatch: () => {},
  style: {},
  trip: {},
  totalExp: {},
  history: {},
};
AddExpense.propTypes = {
  dispatch: PropTypes.func,
  style: PropTypes.object,
  trip: PropTypes.object,
  totalExp: PropTypes.object,
  history: PropTypes.object,
};

const select = state => state;
export default withRouter(connect(select)(AddExpense));
