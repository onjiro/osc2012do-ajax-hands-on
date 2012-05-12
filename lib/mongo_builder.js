var mongo = require('mongodb');

module.exports.ready = function(db_name, fn){
    if (process.env.MONGOLAB_URI) {
        mongo.connect(process.env.MONGOLAB_URI, {}, function(err, db){
            if (err) { throw err; };
            fn(db);
        });
    } else {
        new mongo.Db(db_name, new mongo.Server('localhost', mongo.Connection.DEFAULT_PORT, {}), {}).open(function(err, db){
            if (err) { throw err; };
            fn(db);
        });
    }
};
