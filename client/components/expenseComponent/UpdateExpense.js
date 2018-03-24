import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import asyncActions from '../../actions/asyncActions';
import { FieldSelect, FieldInput, Button } from '../uiKit/UIKit';
import Data from '../../constants/Data.json';
import './UpdateExpense.scss';

class UpdateExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.expense.category,
      amount: props.expense.amount,
      discription: props.expense.discription,
    };
  }

  onChange(v, field) {
    this.setState({ [field]: v });
  }

  onSubmit(e) {
    e.preventDefault();
    const { tripId, _id } = this.props.expense;
    const exp = _.assign({}, this.state, { date: Moment().toDate() });
    this.props.dispatch(asyncActions.updateExpense(exp, tripId, _id))
    .then(x => x.payload._id === _id && this.props.onUpdate(x.payload._id));
  }

  render() {
    const { category, amount, discription } = this.state;

    return (
      <form className="update-expense p-3 mb-3" onSubmit={e => this.onSubmit(e)}>
        <h4 style={{ marginBottom: '30px' }}>Update Expense and Save it</h4>
        <FieldSelect value={category} onChange={v => this.onChange(v, 'category')} options={Data.category} placeholder="Select category" height="35px" style={{ marginBottom: '30px' }} />
        <FieldInput value={amount} onChange={v => this.onChange(v, 'amount')} placeholder="Amount in INR" look="border" style={{ marginBottom: '30px' }} />
        <FieldInput value={discription} onChange={v => this.onChange(v, 'discription')} placeholder="Discription" look="border" style={{ marginBottom: '30px' }} />
        <div className="d-flex justify-content-between">
          <Button className="button btn-white" onClick={() => this.props.onCancel()} style={{ height: '35px', width: '40%' }}>Cancel</Button>
          <Button type="submit" className="button btn-pink" style={{ height: '35px', width: '40%' }}>Save</Button>
        </div>
      </form>
    );
  }
}

UpdateExpense.defaultProps = {
  dispatch: () => {},
  expense: {},
  onUpdate: () => {},
  onCancel: () => {},
};

UpdateExpense.propTypes = {
  dispatch: PropTypes.func,
  expense: PropTypes.object,
  onUpdate: PropTypes.func,
  onCancel: PropTypes.func,
};

const select = state => state;
export default connect(select)(UpdateExpense);
