var express = require('express');
 
var app = express();
var bodyParser=require('body-parser');
 
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));
var insertController=require(__dirname+'/controllers/insertController');
var fetchController=require(__dirname+'/controllers/fetchController');
app.get('/', function(req, res) {
  res.render('home', {
    title: 'Welcome'
  });
});
app.get('/upload', function(req, res) {
    res.render('upload', {
        title: 'UPLOADS'
    });
});
app.get('/temp', function(req, res) {
    res.render('music', {
        title: 'MUSIC'
    });
});
app.post('/uploadLang',insertController.addLanguage);

app.post('/uploadCat',insertController.addCategory);
app.post('/uploadTag',insertController.addTags);
app.get('/getLang',fetchController.fetchLangData);
app.get('/getCat',fetchController.fetchCatData);
app.get('/getTag',fetchController.fetchTagData);
app.get('/getTrack',fetchController.fetchTrackData);
app.get('/deleteTrack/:tID',insertController.deleteTrackData);
app.get('/firstCall',insertController.callTemp);
app.post('/uploadTrack',insertController.addTrack1);
app.post('/updateTrack',insertController.updateTrack);

app.on('stormpath.ready',function(){
  console.log('Stormpath Ready');
});
 
app.listen(8080);
