import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Request from 'axios';
import Dropzone from 'react-dropzone';
import asyncActions from '../../actions/asyncActions';
import syncActions from '../../actions/syncActions';
import { FieldSelect, Button } from '../uiKit/UIKit';
import Data from '../../constants/Data.json';
import UpdateExpense from './UpdateExpense';
import './ShowExpenses.scss';

class ShowExpenses extends Component {
  constructor() {
    super();
    this.state = {
      updateExp: false,
      updated: '',
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
  onDelete(exp) {
    const x = window.confirm('Are you sure you want to delete?');
    const tripId = this.props.selectedTrip._id;
    if (x) this.props.dispatch(asyncActions.deleteExpense(tripId, exp._id));
  }
  onUpdate(exp) {
    if (exp === this.state.updateExp._id) { this.setState({ updateExp: false, updated: exp }); } else { this.setState({ updateExp: exp }); }
  }
  uploadImage(images, exp) {
    this.props.dispatch(asyncActions.uploadImage(images, exp.tripId, exp._id));
    // .then(x => console.log('..x', x)); // this.setState({ updated: x.payload._id })
  }
  render() {
    const { selectedTrip, allExpe } = this.props;
    const { updateExp, updated } = this.state;
    const expeForTrip = (allExpe || []).filter(expe => expe.tripId === selectedTrip._id);
    return (
      <div className="show-expense-wrap px-2 pb-2">
        <h3>Expenses of {selectedTrip.title}</h3>
        {_.isEmpty(expeForTrip) && <span>No expense is added yet</span>}
        {
          (expeForTrip || []).map((exp, key) => (
            updateExp._id !== exp._id
            ?
              <div className="expense p-2 mb-4" key={key}>
                <span className="mb-2">Category: {exp.category}</span>
                <div className="d-flex align-items-center mb-2">
                  <span className="mr-3">Amount: {(exp.amount).toFixed(2)}</span>
                  <FieldSelect value={exp.baseCurrency} onChange={v => this.onChange(v, 'baseCurrency', exp)} options={Data.currency} height="10px" style={{ width: '20%' }} />
                </div>
                <span className="mb-2">Date: {Moment(exp.date).format('DD-MM-YYYY')}</span>
                <span className="mb-2">Discription: {exp.discription}</span>
                <Dropzone style={{}} onDrop={files => this.uploadImage(files, exp)}>
                  <Button className="mb-2" style={{ width: '30%', cursor: 'pointer' }}>Add Attachment</Button>
                </Dropzone>
                <div className="s3-attach">
                  {(exp.images || []).map((img, k) => (
                    <a className="mb-2" href={img} target="_blank" key={k}>Attachment-{k + 1}</a>
                  ))}
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <Button className="button btn-pink" onClick={() => this.onUpdate(exp)} style={{ height: '35px', width: '40%' }}>UPDATE</Button>
                  <Button className="button btn-white" onClick={() => this.onDelete(exp)} style={{ height: '35px', width: '40%' }}>DELETE</Button>
                </div>
                {exp._id === updated && <span className="success-msg mt-2">Successfully Updated</span>}
              </div>
            :
              <UpdateExpense expense={exp} onUpdate={v => this.onUpdate(v)} onCancel={() => this.setState({ updateExp: false })} />
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
