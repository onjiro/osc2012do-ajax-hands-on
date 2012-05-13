var tableName = "reservations";
function Reservation(date, roomId, division, reserver) {
    this.date = date;
    this.roomId = roomId;
    this.division = division;
    this.reserver = reserver;
};

/*
  find reservations from database.
*/
Reservation.find = function(db, date, callback) {
    db.collection(tableName, function(err, collection){
        if (err) { throw err }
        var query = {
            date: date
        };
        collection.find(query).toArray(function(err, reservations) {
            callback(err, reservations || []);
        });
    });
};

/*
  save reservation to database 
*/
Reservation.prototype.save = function(db, callback) {
    var self = this;
    db.collection(tableName, function(err, collection) {
        if (err) {throw err}
        collection.save(self, {safe: true}, callback);
    });
};
module.exports = Reservation;