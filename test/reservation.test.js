var expect = require('expect.js');
var sinon = require('sinon');
var Reservation = require('../lib/reservation.js');

describe('Reservation', function() {
    var reservation, db, collection, selectedReservations;
    beforeEach(function() {
        reservation = new Reservation('2012-04-01', 'seminar_room_a', 'morning');
        db = {
            collection: sinon.spy.create(function(table, fn) {
                fn(null, collection);
            })
        }
        collection = {
            save: sinon.spy.create(function(target, option, fn) {
                fn(null, target);
            }),
            // notice: set selectedReservations before find
            find: sinon.spy.create(function(query) {
                return {
                    toArray: sinon.spy.create(function(fn) {
                        fn(null, selectedReservations);
                    })
                };
            })
        }
    });
    
    describe('instance', function() {
        it('has date', function() {
            expect(reservation.date).to.be('2012-04-01');
        });
        it('has roomId', function() {
            expect(reservation.roomId).to.be('seminar_room_a');
        });
        it('has division', function() {
            expect(reservation.division).to.be('morning');
        });
    });

    describe('::find', function() {
        it('returns Reservations as array if date is assigned', function() {
            selectedReservations = [reservation];
            var callback = sinon.spy.create(function(err, reservations) {
                expect(reservations).to.have.length(1);
                expect(reservations[0]).to.be(reservation);
            });
            
            Reservation.find(db, '2012-04-01', callback);
            
            expect(db.collection.called).to.be.ok();
            expect(collection.find.called).to.be.ok();
            expect(callback.called).to.be.ok();
        });
        it('returns empty array if not matched when date is assigned', function() {
            selectedReservations = null;
            var callback = sinon.spy.create(function(err, reservations) {
                expect(reservations).to.have.length(0);
            });
            
            Reservation.find(db, '2012-04-01', callback);
            
            expect(db.collection.called).to.be.ok();
            expect(collection.find.called).to.be.ok();
            expect(callback.called).to.be.ok();
        });
        it('returns Reservations as array if date and roomId are assigned');
        it('returns empty array if not matched when date and roomId are assigned');
        it('returns a Reservation if date, roomId and division are assigned');
        it('returns null if not matched when date, roomId and division are assigned');
    });
    
    describe('#save', function() {
        it('call collection.save', function() {
            // setup
            var callback = sinon.spy.create(function(err, item) {
                expect(item).to.be(reservation);
            });
            
            // execute and assert
            reservation.save(db, callback);
            
            // assert
            expect(db.collection.called).to.be.ok();
            expect(collection.save.called).to.be.ok();
            expect(callback.called).to.be.ok();
        });
    });
});

