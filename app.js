var express = require('express');
var app = express.createServer();

app.use(express.static(__dirname + '/view_sample'));

app.listen(3000);
console.log('server start at localhost:3000');
