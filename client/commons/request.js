require('dotenv').config();
const request = require('superagent');

const BASE_URL = process.env.BASE_URL;
const agent = request.agent();

const makeRequest = (path, method, body) => {
  const req = agent[method](`${BASE_URL}${path}`);
  if(body) {
    req.send(body);
  }

  return req;
};

module.exports = {
  post: (path, body) => makeRequest(path, 'post', body),
  get: path => makeRequest(path, 'get'),
  patch: (path, body) => makeRequest(path, 'patch', body),
  del: path => makeRequest(path, 'delete')
};
