var tableName = "reservations";
function Reservation(date, roomId, division) {
    this.date = date;
    this.roomId = roomId;
    this.division = division;
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