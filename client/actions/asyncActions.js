import Request from 'axios';
import syncActions from './syncActions';

const ip = '/api';
function makeRequest(method, api = '/login', data) {
  return Request[method](ip + api, data)
        .then(r => r);
}
