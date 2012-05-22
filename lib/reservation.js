var tableName = "reservations";
function Reservation(datas) {
    this.date = datas.date;
    this.roomId = datas.roomId;
    this.division = datas.division;
    this.reserver = datas.reserver;
};

/*
  find reservations from database.
*/
Reservation.find = function(db, date, callback) {
    var datas = date;
    db.collection(tableName, function(err, collection){
        if (err) { throw err }
        var query = (datas.date) ? datas: {
            date: date
        };
        collection.find(query).toArray(function(err, reservations) {
            callback(err, reservations || []);
        });
    });
};

Reservation.remove = function(db, date, roomId, division, callback) {
    db.collection(tableName, function(err, collection){
        if (err) {throw err}
        var query = {
            date: date,
            roomId: roomId,
            division: division
        };
        collection.remove(query, function(err, reservation) {
            callback(err, reservation);
        });
    });
};

/*
  save reservation to database 
  overwrite if alredy exists a record that has same date, roomId and division
*/
Reservation.prototype.save = function(db, callback) {
    var self = this;
    db.collection(tableName, function(err, collection) {
        if (err) {throw err}
        var query = {date: self.date, roomId: self.roomId, division: self.division};
        collection.findOne(query, function(err, foundOne) {
            if (err) {throw err}
            
            // we overwrite the record if already exists.
            // mongo overwrites the record when same '_id' setted.
            if (foundOne) {
                self._id = foundOne._id;
            }
            collection.save(self, {safe: true}, callback);
        });
    });
};
module.exports = Reservation;