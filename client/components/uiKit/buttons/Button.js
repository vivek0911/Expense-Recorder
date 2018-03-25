import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ type, children, disabled, onClick, style, className }) => {
  return (
    <button
      className={`button ${className} ${disabled && 'btn-dis'}`} {...{ disabled, style, type }}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: '',
  style: {},
  disabled: false,
  onClick: () => {},
  className: '',
  look: 'blue',
};

Button.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  look: PropTypes.oneOf(['blue', 'white']),
};

export default Button;
