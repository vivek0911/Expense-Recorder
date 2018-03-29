import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import asyncActions from '../../actions/asyncActions';
import { FieldSelect, FieldInput, FieldDatePicker, Button } from '../uiKit/UIKit';
import Data from '../../constants/Data.json';
import './UpdateExpense.scss';

class UpdateExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.expense.title,
      category: props.expense.category,
      amount: props.expense.amount,
      baseCurrency: props.expense.baseCurrency,
      date: Moment(props.expense.date).isValid() ? Moment(props.expense.date).toDate() : '',
      place: props.expense.place,
      discription: props.expense.discription,
      mot: props.expense.mot,
    };
  }

  onChange(v, field) {
    const value = field === 'date' && Moment(v).isValid() ? Moment(v).toDate() : v;
    this.setState({ [field]: value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { tripId, _id } = this.props.expense;
    const exp = _.assign({}, this.state);
    const { trip } = this.props;
    this.props.dispatch(asyncActions.updateExpense(exp, tripId, _id))
    .then(x => x.payload._id && this.props.history.push({ pathname: `/trip/${trip._id}`, state: { trip } }));
  }

  render() {
    const { title, category, amount, baseCurrency, place, date, discription, mot } = this.state;
    const disabled = _.isEmpty(title) || _.isEmpty(category) || (!amount) || _.isEmpty(baseCurrency);
    const { trip, history } = this.props;
    return (
      <form className="update-expense" onSubmit={e => this.onSubmit(e)}>
        <h5 className="mb-3">Update Expense and Save it</h5>
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
        <div className="d-flex justify-content-between">
          <Button className="button btn-white" onClick={() => history.push({ pathname: `/trip/${trip._id}`, state: { trip } })} style={{ height: '35px', width: '40%' }}>Cancel</Button>
          <Button type="submit" disabled={disabled} className="button btn-blue" style={{ height: '35px', width: '40%' }}>Save</Button>
        </div>
      </form>
    );
  }
}

UpdateExpense.defaultProps = {
  dispatch: () => {},
  expense: {},
  trip: {},
  history: {},
};

UpdateExpense.propTypes = {
  dispatch: PropTypes.func,
  expense: PropTypes.object,
  trip: PropTypes.object,
  history: PropTypes.object,
};

const select = state => state;
export default withRouter(connect(select)(UpdateExpense));
