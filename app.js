var express = require('express');
var mongo_builder = require('./lib/mongo_builder');

var start = function(app, db, port) {
    app.use(express.static(__dirname + '/view_sample'));
    app.use(express.bodyParser());
    
    var reservationUrl = '/reservations/';
    app.get(reservationUrl + ':date.:roomId?.:division?', function(req, res){
        var reservations = [];
        res.send(reservations);
    });
    app.post(reservationUrl + ':date.:roomId.:division', function(req, res){
        // TODO res.send(err);
    });
    app.del(reservationUrl + ':date.:roomId.:division', function(req, res){
        // TODO res.send(err)
    });

    app.listen(port);
    console.log('server start at localhost:' + port);
};

mongo_builder.ready('room-reservations', function(db){
    start(express.createServer(), db, 3000);
});
