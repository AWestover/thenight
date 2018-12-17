// behind the scenes of the game
let express = require('express'); // needs this library
let app = express();
let port = process.env.PORT || 3000;  // what port to open it on must have the option to be
// chosen by server if you want it to be heroku compatible, also does need the default
let server = require('http').createServer(app).listen(port);
let socket = require('socket.io');
let io = socket(server);
app.use(express.static('public'));

// handle posts
app.post('/index', function(req, resp) {
  console.log("posted on index");
  if (req.body){
    // I think this happens if you submit a form
    console.log(req.body.pwd);
  }
  resp.redirect('index.html');
});

console.log("server running");
io.sockets.on('connection', newConnection);  // when you get a connection do this

let playersConnected = [];
let data = {}; // the data, compute collisions from this
const maxSLength = 15;

function newConnection(socket) {
	/*
		socket.on  - when this specific socket instance (which indexjs holds all of the sockets) hears something

		socket.emit - emit to this socket only
		socket.broadcast - to all other people
		io.sockets.emit - to everyone
	*/

  console.log("new connection");
  let name;

  socket.on('named', function(data) {
    // later do not allow duplicates
    name = data["name"];

    if (!name)
      name="User";
    if (name.length > maxSLength)
      name = name.slice(0,maxSLength);

    while (playersConnected.indexOf(name)!=-1)
    	name = name + Math.floor(Math.random()*10);

    console.log(name + " added" );
    playersConnected.push(name);

    socket.emit('nameChosen', name);
  });

  socket.on('updateData', function(data) {
    console.log(data);
    console.log("updating data");
  });

  socket.on('getData', function(data) {
    socket.emit('gotData', userData);
  });

  socket.on('disconnect', function(data) {
    console.log("disconnect");
  });

}
