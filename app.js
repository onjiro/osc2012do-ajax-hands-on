var express = require('express');

(function(app, port) {
app.use(express.static(__dirname + '/view_sample'));

app.listen(port);
console.log('server start at localhost:' + port);
})(express.createServer(), 3000);
