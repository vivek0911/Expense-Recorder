import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

class Modal extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { style, onClose } = this.props;
    return (
      <div className="er-modal">
        <div className="er-overlay" onClick={onClose} />
        <div className="modal-data-container" style={style}>
          <i className="fa fa-times-circle cross-close" aria-hidden="true" onClick={onClose} />
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  style: {},
};
Modal.propTypes = {
  style: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
export default Modal;
