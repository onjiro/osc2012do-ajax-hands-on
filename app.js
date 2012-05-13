var express = require('express');
var mongo_builder = require('./lib/mongo_builder');
var Reservation = require('./lib/reservation');

var start = function(app, db, port) {
    app.use(express.static(__dirname + '/view_sample'));
    app.use(express.bodyParser());
    
    var reservationUrl = '/reservations';
    app.get(reservationUrl, function(req, res){
        console.log(new Date(), reservationUrl, 'get', req.query);
        var date = req.query.date;
        var roomId = req.query.roomId;
        var division = req.query.division;
        Reservation.find(db, date, function(err, reservations) {
            res.send(reservations);
        });
    });
    app.post(reservationUrl, function(req, res){
        // TODO res.send(err);
    });
    app.del(reservationUrl, function(req, res){
        // TODO res.send(err)
    });
    
    // テスト用に起動時に db を削除
    db.collection('reservations', function(err, collection) {
        if (err) {throw err;}
        collection.drop();
    });
    
    app.listen(port);
    console.log('server start at localhost:' + port);
};

mongo_builder.ready('room-reservations', function(db){
    start(express.createServer(), db, 3000);
});
