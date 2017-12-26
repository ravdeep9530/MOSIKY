var connection = require('../config/config');
module.exports.fetchLangData=function(req,res){

    connection.query('SELECT * FROM LANGUAGES', function (error, results, fields) {
        {

            res.json({
                data:results
            })

            //res.send(JSON.stringify(results));
        }
    });
}
module.exports.fetchCatData=function(req,res){

    connection.query('SELECT * FROM TRACK_CATEGORY', function (error, results, fields) {
        {

            res.json({
                data:results
            })

            //res.send(JSON.stringify(results));
        }
    });
}
module.exports.fetchTagData=function(req,res){

    connection.query('SELECT * FROM TAGS', function (error, results, fields) {
        {

            res.json({
                data:results
            })

            //res.send(JSON.stringify(results));
        }
    });
}
module.exports.fetchTrackData=function(req,res){

    connection.query('SELECT * FROM TRACKS t INNER JOIN TRACKS_DETAIL td ON t.track_id=td.track_id INNER JOIN TRACK_TAGS tg on t.track_id=tg.track_id   ' +
        'INNER JOIN LANGUAGES l on t.track_languageID=l.languagesID INNER JOIN TRACK_CATEGORY tc ON t.track_categoryID=tc.category_id where  tc.isActive=1 and l.isActive=1', function (error, results, fields) {
        {

            res.json({
                data:results
            });

            //res.send(JSON.stringify(results));
        }
    });
}
