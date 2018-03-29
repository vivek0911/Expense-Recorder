import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';
import _ from 'lodash';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import Request from 'axios';
import Dropzone from 'react-dropzone';
import asyncActions from '../../actions/asyncActions';
// import syncActions from '../../actions/syncActions';
// import { FieldSelect, Button } from '../uiKit/UIKit';
// import Data from '../../constants/Data.json';
import './TripExpenses.scss';

class TripExpenses extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
    this.props.dispatch(asyncActions.getExpensesByTripId(this.props.trip._id));
  }
  onDelete(exp) {
    const x = window.confirm('Are you sure you want to delete?');
    const tripId = exp.tripId;
    if (x) this.props.dispatch(asyncActions.deleteExpense(tripId, exp._id));
  }
  uploadImage(images, exp) {
    this.props.dispatch(asyncActions.uploadImage(images, exp.tripId, exp._id));
  }
  render() {
    const { trip, tripExpe, history } = this.props;
    return (
      tripExpe.length === 0
      ?
        <div className="no-expense-msg">
          <div>You have not added any expense to {trip.title} yet</div>
          <div>Let's get started by <Link to={{ pathname: `/trip/${trip._id}/addExpense`, state: { trip } }}>adding expenses</Link> to <span>{trip.title}</span></div>
        </div>
      :
        <div className="trip-expenses-wrap p-2">
          <h5 className="mb-3">Find All Expenses of <span>{trip.title}</span> Here</h5>
          <div className="expe-cards-wrap">
            {
              (tripExpe || []).map((expe, key) => (
                <div className="expense px-3 pt-3 pb-2" key={key}>
                  <div className="first-row mb-3">
                    <div className="title-date">
                      <span className="mb-3">{expe.title}</span>
                      <div className="date-attach">
                        <span><i className="fa fa-calendar mr-2" />{Moment(expe.date).isValid() ? Moment(expe.date).format('DD-MM-YYYY') : 'Not Available'}</span>
                        <Dropzone style={{}} onDrop={files => this.uploadImage(files, expe)}>
                          <i className="fa fa-paperclip fa-rotate-90 mr-1" /> Attach
                        </Dropzone>
                      </div>
                    </div>
                    <div className="upd-del">
                      <i className="fa fa-pencil mr-3" onClick={() => history.push({ pathname: `/trip/${trip._id}/updateExpense/${expe._id}`, state: { trip, expense: expe } })} />
                      <i className="fa fa-trash" onClick={() => this.onDelete(expe)} style={{ color: '#d4121c' }} />
                    </div>
                  </div>
                  <div className="comm-row mb-2">
                    <div className="category comm-item">
                      <span>Category</span><span>{expe.category}</span>
                    </div>
                    {expe.mot ?
                      <div className="place comm-item">
                        <span>Mode of Transport</span><span>{expe.mot}</span>
                      </div> :
                      <div className="place comm-item">
                        <span>Place</span><span>{expe.place || 'NA'}</span>
                      </div>
                    }
                  </div>
                  <div className="comm-row mb-2">
                    <div className="amount comm-item">
                      <span>Amount</span><span>{expe.amount}&nbsp;{expe.baseCurrency}</span>
                    </div>
                    <div className="add-note comm-item">
                      <span>Note</span><span>{expe.discription || 'NA'}</span>
                    </div>
                  </div>
                  <div className="s3-attach">
                    {(expe.images || []).map((img, k) => (
                      <a className="mb-2" href={img} target="_blank" key={k}>Attachment-{k + 1}</a>
                    ))}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
    );
  }
}

TripExpenses.defaultProps = {
  dispatch: () => {},
  trip: {},
  tripExpe: [],
  history: {},
};
TripExpenses.propTypes = {
  dispatch: PropTypes.func,
  trip: PropTypes.object,
  tripExpe: PropTypes.array,
  history: PropTypes.object,
};

const select = state => ({ tripExpe: state.tripReducer.tripExpenses });
export default withRouter(connect(select)(TripExpenses));
