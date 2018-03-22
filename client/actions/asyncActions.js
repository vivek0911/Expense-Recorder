import Request from 'axios';
import syncActions from './syncActions';

const ip = '/api';
function makeRequest(method, api = '/login', data) {
  return Request[method](ip + api, data)
        .then(r => r);
}

exports.uploadImage = images => (dispatch) => {
  const data = new FormData();
  images.forEach(img => data.append('file', img));
  makeRequest('post', '/image/upload', data);
    // .then(response => dispatch(syncActions.uploadedImages(response.data)));
};
