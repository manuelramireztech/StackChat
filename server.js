var express = require("express");
var session = require("express-session");
var passport = require("./config/passport");
var handlebars = require("express-handlebars");
var PORT = process.env.PORT || 8080;
var db = require("./models");
var SocketIO = require('socket.io');
var app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: "chit chat", resave: true, saveUninitialized: true }));


app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

let io
db.sequelize.sync({ force: false }).then(function () {
   io = SocketIO(app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:" + PORT);
  io.on('connection', socket => {
     socket.on('new-user', name => {
         users[socket.id] = name
         socket.broadcast.emit('user-connected', name)
     })

     socket.on('send-chat-message', message => {
         socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]
     })
 })
     socket.on('disconnect', () => {
         socket.broadcast.emit('user-disconnected', users[socket.id])
         delete users[socket.id]
     })
 })

  }));
  
});

 //const io = require("socket.io")(4000)
 const users = {}

 