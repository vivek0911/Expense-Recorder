import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import './FieldDatePicker.scss';

const FieldDatePicker = ({ onChange, value, style, placeholder }) => {
  console.log('field DatePicker');
  return (
    <div className="field-date-picker" {...{ style }}>
      <DatePicker
        selected={value}
        dateFormat="DD/MM/YYYY"
        className="field-dp"
        placeholderText={placeholder}
        onChange={v => onChange(v.toDate())}
      />
    </div>
  );
};

FieldDatePicker.defaultProps = {
  placeholder: 'choose date',
  value: '',
  onChange: () => {},
  style: {},
};

FieldDatePicker.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

export default FieldDatePicker;

