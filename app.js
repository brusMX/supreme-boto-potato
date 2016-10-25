
/*-----------------------------------------------------------------------------
A simple "Hello World" bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  

function getMessages(req, res, next) {
    res.end('<html><body><h1>helloworld</h1></body></html>');
});
server.get('/', getMessages);



//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.send("Hello World");
});
