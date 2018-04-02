import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
// import Select from 'react-select';
import './FieldSelectCurrency.scss';

const FieldSelectCurrency = ({ options, onChange, value, style, selectStyle }) => (
  <div className="field-select-currency" {...{ style }}>
    <select value={value} onChange={e => onChange(e.target.value)} style={selectStyle}>
      {
        (options || []).map((o, key) => (
          <option key={key}>{o.label}</option>
        ))
      }
    </select>
  </div>
  );

FieldSelectCurrency.defaultProps = {
  options: [],
  value: '',
  onChange: () => {},
  style: {},
  selectStyle: {},
};

FieldSelectCurrency.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      lable: PropTypes.string,
    }),
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  selectStyle: PropTypes.object,
};

export default FieldSelectCurrency;

// <option value="" disabled selected>{placeholder}</option>
