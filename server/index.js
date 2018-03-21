require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(compression());
/* Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app.
  When a gzip compatible browser requests for some resource, the server can compress the response before sending
  it to the browser. If you don’t use gzip for compressing your static resource it might take longer for the
  browser to fetch it.
 */
app.use(express.static(path.join('.')));

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
// https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
// https://www.quora.com/What-exactly-does-body-parser-do-with-express-js-and-why-do-I-need-it

const connect = require('./db');
const routes = require('./db/routes');

connect();

app.use('/api', routes);
app.use('/*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/index.html`));
});

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
