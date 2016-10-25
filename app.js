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
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});


var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
server.get('/chat', function (req, res, next) {
    res.send('<html><body><iframe src\'https://webchat.botframework.com/embed/dxtraining?s=uh0tMFuMOE8.cwA.b-4.JbRhj_AJYwgG1HaNmtY5mW50yT3ryUzgi1kmirc_AHg\'></iframe></body></html>');
    return next();
});

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.send("Hello World");
});
