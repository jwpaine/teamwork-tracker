var builder = require('botbuilder');  
const request = require('request')
const express = require('express')
const bodyParser = require('body-parser');
const app = express()


app.use(bodyParser.json());
app.set('port', 8080);
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
	console.log('bot running on port', app.get('port'))
});

var connector = null;

exports.init = function(id,password, callback) {
    // chat connector for communicating with the Bot Framework Service 
    connector = new builder.ChatConnector({     
        appId: id,
        appPassword: password
    });
    
}
app.get('/', function(req,res) {
	res.send('hello!');
});


app.get('/tasks', function(req,res) {
	res.render('tasks');
});

app.post('/api/messages', function(req,res) {
	console.log(req.body);
//	res.send('ok');
});


app.post('/getTasks', function(req,res) {
	console.log('requesting tasks');

});

var bot = new builder.UniversalBot(connector, function (session) {
	session.send('test');
});
