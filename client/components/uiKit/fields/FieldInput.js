import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import './FieldInput.scss';

const FieldInput = ({ placeholder, type, value, onChange, look, style, inputStyle }) => (
  <div className="input-wrapper" style={style}>
    <input
      {...{ type, value: _.isNull(value) ? '' : value, placeholder }}
      className={`field-text-input ${look === 'border' && 'onFocus-border'}`} style={inputStyle}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

FieldInput.defaultProps = {
  onChange: () => {},
  placeholder: 'type text...',
  look: '',
  style: {},
  inputStyle: {},
  type: 'text',
  value: '',
};

FieldInput.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  inputStyle: PropTypes.object,
  type: PropTypes.oneOf(['text', 'number']),
  look: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FieldInput;


// box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.75);
