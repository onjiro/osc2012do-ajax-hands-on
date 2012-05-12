var expect = require('expect.js');
var Reservation = require('../lib/reservation.js');

describe('Reservation', function() {
    var reservation = null;
    beforeEach(function() {
            reservation = new Reservation('2012-04-01', 'seminar_room_a', 'morning');
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
});

