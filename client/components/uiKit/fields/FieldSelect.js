import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './FieldSelect.scss';

const FieldSelect = ({ options, onChange, value, height, style, placeholder }) => (
  <div className="field-select-wrapper" {...{ style }}>
    <Select
      style={{ height }}
      value={value}
      className="field-select"
      options={options}
      placeholder={placeholder}
      simpleValue
      onChange={v => onChange(v)}
    />
  </div>
  );

FieldSelect.defaultProps = {
  placeholder: 'choose option',
  options: [],
  value: '',
  onChange: () => {},
  height: '40px',
  style: {},
};

FieldSelect.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any,
      lable: PropTypes.string,
    }),
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
  height: PropTypes.string,
  style: PropTypes.object,
};

export default FieldSelect;

