var express = require('express');
var mongo_builder = require('./lib/mongo_builder');
var Reservation = require('./lib/reservation');

var start = function(app, db, port) {
    app.use(express.static(__dirname + '/view_sample'));
    app.use(express.bodyParser());
    
    var reservationUrl = '/reservations';
    app.get(reservationUrl, function(req, res){
        console.log(new Date(), reservationUrl, 'get', req.query);
        Reservation.find(db, req.query, function(err, reservations) {
            console.log(new Date(), reservationUrl, 'get', req.query, reservations);
            res.send(reservations);
        });
    });
    app.post(reservationUrl, function(req, res){
        console.log(new Date(), reservationUrl, 'post', req.body);
        new Reservation(req.body).save(db, function(err, item) {
            res.send();
        });
    });
    app.del(reservationUrl, function(req, res){
        console.log(new Date(), reservationUrl, 'del', req.body);
        Reservation.remove(db, req.body, function(err, item) {
            res.send();
        });
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
    start(express.createServer(), db, process.env.PORT || 3000);
});
