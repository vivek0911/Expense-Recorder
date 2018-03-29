import _ from 'lodash';
import initialState from './initialState';

export default (state = initialState.rate, action) => {
  switch (action.type) {
    case 'STORE_RATES':
      return _.assign({}, state, { rates: action.payload });
    default:
      return state;
  }
};
