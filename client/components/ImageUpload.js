import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import asyncActions from '../actions/asyncActions';

class ImageUpload extends Component {
  constructor() {
    super();
    this.state = {};
  }

  uploadImage(images) {
    this.props.dispatch(asyncActions.uploadImage(images));
  }

  render() {
    console.log('test for image uploading to aws s3');
    return (
      <div className="row-col-center" style={{ height: '100vh' }}>
        <Dropzone style={{}} onDrop={files => this.uploadImage(files)}>
          <i className="fa fa-upload" style={{ fontSize: '2rem' }} />
        </Dropzone>
      </div>
    );
  }
}

ImageUpload.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const select = state => state;
export default connect(select)(ImageUpload);


// https://stackoverflow.com/questions/41025078/react-dropzone-how-to-upload-image
// https://stackoverflow.com/questions/17930204/simple-file-upload-to-s3-using-aws-sdk-and-node-express
