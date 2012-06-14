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
            res.header('Access-Control-Allow-Origin', '*');
            res.send(reservations);
        });
    });
    app.post(reservationUrl, function(req, res){
        console.log(new Date(), reservationUrl, 'post', req.body);
        new Reservation(req.body).save(db, function(err, item) {
            res.header('Access-Control-Allow-Origin', '*');
            res.send(req.body);
        });
    });
    app.del(reservationUrl, function(req, res){
        console.log(new Date(), reservationUrl, 'del', req.body);
        Reservation.remove(db, req.body, function(err, item) {
            res.header('Access-Control-Allow-Origin', '*');
            res.send(req.body);
        });
    });
    
    // 404 をログして url の typo をチェック可能に
    app.get('*', function(req, res) {
        console.log('404', req.url, req.query);
        res.send(404);
    });
    
    app.listen(port);
    console.log('server start at localhost:' + port);
};

mongo_builder.ready('room-reservations', function(db){
    start(express.createServer(), db, process.env.PORT || 3000);
});
