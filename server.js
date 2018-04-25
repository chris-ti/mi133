//redo with es6 import?
var express = require('express');
var app = express();
var path = require('path');

const indexPath = path.join(__dirname + '/dist/index.html');
const publicPath = express.static(path.join(__dirname + '/dist'));
app.use('/', publicPath);


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
