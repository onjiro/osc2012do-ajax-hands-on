var express = require('express');
var mongo_builder = require('./lib/mongo_builder');

var start = function(app, db, port) {
    app.use(express.static(__dirname + '/view_sample'));
    app.use(express.bodyParser());
    
    var reservationUrl = '/reservations';
    app.get(reservationUrl, function(req, res){
        var date = req.query.date;
        var roomId = req.query.roomId;
        var division = req.query.division;
        console.log('get:' + reservationUrl);
        for (key in req.query) {
            console.log('  ' + key + ': ' + req.query[key]);
        }
        var reservations = [];
        res.send(reservations);
    });
    app.post(reservationUrl, function(req, res){
        // TODO res.send(err);
    });
    app.del(reservationUrl, function(req, res){
        // TODO res.send(err)
    });

    app.listen(port);
    console.log('server start at localhost:' + port);
};

mongo_builder.ready('room-reservations', function(db){
    start(express.createServer(), db, 3000);
});
