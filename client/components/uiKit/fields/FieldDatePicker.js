import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import './FieldDatePicker.scss';

const FieldDatePicker = ({ onChange, value, style, placeholder }) => {
  return (
    <div className="field-date-picker" {...{ style }}>
      <DatePicker
        selected={Moment(value).isValid() ? Moment(value) : undefined}
        dateFormat="DD/MM/YYYY"
        placeholderText={placeholder}
        onChange={v => onChange(v)}
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
  value: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
};

export default FieldDatePicker;

