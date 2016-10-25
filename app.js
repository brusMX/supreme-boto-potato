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


//=========================================================
// Bots Dialogs
//=========================================================

var questions =  [ 
    { q: "Which of the following commands can be used to assure that a file 'myfile' exists?", o:['cp myfile /dev/null','touch myfile','create myfile','mkfile myfile'], a:2 },
    { q: "What is 3?", o:['1','2','3'], a:3 },
    { q: "What is 1?", o:['1','2','3'], a:1 },
    { q: "What is 2?", o:['1','2','3'], a:2},
    { q: "What is 4?", o:['1','2','3','4'], a:4 }
   ];
var rnd = Math.floor(Math.random() * (6));
var correctAns = 0;
bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, "Hello! I´m the supreme bot-o potato. What's your name?");
    },
    function (session, results) {
        session.userData.name = results.response;
        builder.Prompts.number(session, "I salu-tato you, " + results.response + ". " + questions[rnd].q, questions[rnd].o); 
    },
    function (session, results) {
        if(results.response == questions[rnd].a) 
            correctAns++;
        builder.Prompts.number(session, questions[rnd].q, questions[rnd].o); 
    },
    function (session, results) {
        session.userData.count = correctAns;
        session.send("Thank you " + session.userData.name + 
                     "you had " + session.userData.count + "answers right.");
    }
]);