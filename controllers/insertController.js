    var connection = require('../config/config');
    const execSync = require('child_process').execSync;
    var fs=require('fs');
    module.exports.register=function(req,res){
        var today = new Date();
        var users={
            "name":req.body.name,
            "email":req.body.email,
            "password":req.body.password,
            "created_at":today,
            "updated_at":today
        }
        connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
          if (error) {
            res.json({
                status:false,
                message:'there are some error with query'
            })
          }else{
              res.redirect('/upload');
          }
        });
    }
    module.exports.addLanguage=function(req,res){
        var today = new Date();
        var lang={
            "language_name":req.body.Lname,
            "isActive":1,
            "language_flag":1
        }
        connection.query('INSERT INTO LANGUAGES SET ?',lang, function (error, results, fields) {
            if (error) {
                res.json({
                    status:false,
                    message:'there are some error with query'+req.body.Lname
                })
            }else{
               res.redirect('/upload');
            }
        });
    }
    module.exports.addCategory=function(req,res){
        var today = new Date();
        var cat={
            "category_name":req.body.Cname,
            "isActive":1,
            "category_flag":1
        }
        connection.query('INSERT INTO TRACK_CATEGORY SET ?',cat, function (error, results, fields) {
            if (error) {
                res.json({
                    status:false,
                    message:'there are some error with query'
                })
            }else{
                res.redirect('/upload');
            }
        });
    }
    module.exports.deleteTrackData=function(req,res){

        connection.query('DELETE t1,t2,t3 FROM TRACKS t1 INNER JOIN TRACKS_DETAIL t2 ON t1.track_id=t2.track_id INNER JOIN TRACK_TAGS t3 ON t2.track_id=t3.track_id WHERE t1.track_id='+req.params.tID, function (error, results, fields) {
            if (error) {
                res.json({
                    status:error,
                    message:'there are some error with query'
                })
            }else{
                res.json({
                    status: true,
                    data: results,
                    message: 'user registered sucessfully'
                })
            }
        });
    }
    module.exports.addTags=function(req,res){
        var today = new Date();
        var lang={
            "tag_name":req.body.TagName,
            "isActive":1,
            "tag_flag":1
        }
        connection.query('INSERT INTO TAGS SET ?',lang, function (error, results, fields) {
            if (error) {
                res.json({
                    status:false,
                    message:'there are some error with query'
                })
            }else{
                res.redirect('/upload');
            }
        });
    }
    module.exports.updateTrack=function(req,res){
        var today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

        connection.query('UPDATE TRACKS,TRACKS_DETAIL,TRACK_TAGS SET TRACKS.track_name="'+req.body.tName+'",TRACKS.track_categoryID="'+req.body.tCategory+'",TRACKS.track_languageID='+req.body.tLang+',TRACKS.track_duration="'+req.body.tDuration+'",TRACKS.modified_date="'+today+'",TRACKS_DETAIL.album="'+req.body.alName+'",' +
            ' TRACKS_DETAIL.artist="'+req.body.arName+'",TRACKS_DETAIL.description="'+req.body.tDescription+'",TRACKS_DETAIL.genre="'+req.body.genre+'",TRACKS_DETAIL.lyrics="'+req.body.tLyric+'",TRACKS_DETAIL.year="'+req.body.tYear+'",TRACK_TAGS.tags="'+req.body.tTags+'",TRACK_TAGS.beat="'+req.body.tBeat+'",TRACK_TAGS.tempo="'+req.body.tTempo+'" WHERE TRACKS.track_id='+req.body.tID+' and TRACKS_DETAIL.track_id='+req.body.tID+' AND TRACK_TAGS.track_id='+req.body.tID, function (error, results, fields) {
            if (error) {
                res.json({
                    status:false,
                    message:'there are some error with query'
                })
            }else{
                res.json({
                    status: true,
                    data: results,
                    message: 'user registered sucessfully'
                })
            }
        });
    }
 module.exports.addTrack1=function(req,res){
        var today = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var lang={
            "track_name":req.body.tName,
            "track_duration":req.body.tDuration,
            "track_categoryID":parseInt(req.body.tCategory),
            "track_languageID":parseInt(req.body.tLang),
            "modified_date":today,
            "modifiedByID":12,
            "isActive":1
        }


        connection.query('INSERT INTO TRACKS SET ?',lang, function (error, results, fields) {
            if (error) {
                res.json({
                    status:false,
                    data:error,
                    message:'there are some error with query'
                })
            }else{
                var detail={
                    "track_id":results.insertId,
                    "year":req.body.tYear,
                    "genre":req.body.genre,
                    "artist":req.body.arName,
                    "album":req.body.alName,
                    "description":req.body.tDescription,
                    "lyrics":req.body.tLyric


                }
                var tag={
                    "track_id":results.insertId,
                    "tags":req.body.tTags,
                    "beat":req.body.tBeat,
                    "tempo":req.body.tTempo,
                }
                connection.query('INSERT INTO TRACKS_DETAIL SET ?',detail, function (error, results, fields) {
                    if (error) {
                        res.json({
                            status: false,
                            data: error,
                            message: 'there are some error with query'
                        })
                    }else {
                        connection.query('INSERT INTO TRACK_TAGS SET ?',tag, function (error, results, fields) {
                            if (error) {
                                res.json({
                                    status: false,
                                    data: error,
                                    message: 'there are some error with query'
                                })
                            }else {
                                res.json({
                                    status: true,
                                    data: results,
                                    message: 'user registered sucessfully'
                                })
                            }
                    });


                }});
            }
        });
    }

 module.exports.callTemp=function(req,res) {
     /* function os_func() {
          this.execCommand = function (cmd, myCallback) {
              var ret;
              exec(cmd, (error, stdout, stderr) => {
                  if (error) {
                      console.error(`exec error: ${error}`);
                      return;
                  }
                  ret = stdout;
                  myCallback(ret);

              });
          }
      }


      var os = new os_func();

      os.execCommand("python3 ./model.py", function (returnvalue) {
          f = fs.readFileSync('./music1.json');
          let music = JSON.parse(f);
          res.json({data: returnvalue})

      });*/
var child = require('child_process').exec('python3 ./model.py')
child.stdout.pipe(process.stdout)
child.on('exit', function() {
     f = fs.readFileSync('./music1.json');
          let music = JSON.parse(f);
          res.json({data: music})

})
 }