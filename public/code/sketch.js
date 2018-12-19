// AUTHOR: Alek Westover
// thenight

// MAJOR NOTE: no more of this updating user view, UPDATE THE user pos!

let myp5 = new p5(function(sketch) {
let user;
let playerData = {};
let rDots = [];

sketch.setup = function()
{
  screen_dims = [sketch.windowWidth, sketch.windowHeight];
  canvas = sketch.createCanvas(screen_dims[0], screen_dims[1]);
  sketch.textAlign(sketch.CENTER);
  sketch.frameRate(10);

  socket = io.connect();
  socket.on('nameChosen', sketch.handleNameChosen);
  socket.on('requestedData', sketch.handleRequestedData);

  socket.emit("named", {"name": "alek"}); // you can choose a name later...

  user = new User();

  for (var i = 0; i < 60; i++) {
    rDots.push([gridSize*(2*Math.random()-1),gridSize*(2*Math.random()-1)])
  }
}

sketch.draw = function() {
  sketch.background(0,0,0);
  sketch.push();
  sketch.translate(screen_dims[0]/2, screen_dims[1]/2);
  sketch.translate(-user.pos[0], -user.pos[1]);

  for(let unm in playerData) {
    if(unm != name)
      renderUser(sketch,playerData[unm].pos,playerData[unm].vel);
  }
  renderUser(sketch,user.pos,user.vel);

  sketch.fill(0,0,0);
  for (var i = 0; i < rDots.length; i++) {
    sketch.ellipse(rDots[i][0],rDots[i][1],10,10);
  }

  // process movement requests
  user.zeroVel();
  sketch.handleKeysDown();
  if(accelerometerWanted)
    sketch.handleTilted();
  if (isDown) // handle dragging
  {
    let current_pos = [sketch.mouseX, sketch.mouseY];
    if (onCanvas(current_pos))
    {
      user.updateView(last_down, current_pos);
      last_down = [sketch.mouseX, sketch.mouseY];
    }
    else {
      isDown = false;
    }
  }

  socket.emit("requestData");
  socket.emit("sendData", {"pos": user.pos, "vel": user.vel});

  sketch.pop();
}

sketch.handleRequestedData = function(data) {
  playerData = data;
}

sketch.handleNameChosen  = function(data) {
  console.log("name is " + data);
  name = data;
}

sketch.handleKeysDown = function() {
  let keyD = 30;
  let tVel = [0, 0];
  if (sketch.keyIsDown(sketch.LEFT_ARROW) || sketch.keyIsDown(keyCodes['a']))
    tVel[0] = keyD;
  else if (sketch.keyIsDown(sketch.RIGHT_ARROW) || sketch.keyIsDown(keyCodes['d']))
    tVel[0] = -keyD;
  if (sketch.keyIsDown(sketch.UP_ARROW) || sketch.keyIsDown(keyCodes['w']))
    tVel[1] = keyD;
  else if (sketch.keyIsDown(sketch.DOWN_ARROW) || sketch.keyIsDown(keyCodes['s']))
    tVel[1] = -keyD;

  if (magSquared(tVel) != 0)
    user.updateView(user.pos, addV(user.pos, tVel));
};

sketch.handleTilted = function()
{
  let rD = 20;
  let threshold = 10;
  let dvs = [[rD, 0], [-rD, 0], [0, rD], [0, -rD]];
  if (sketch.deviceOrientation == "landscape")
      dvs = [[0, -rD], [0, rD], [rD, 0], [-rD, 0]];

  if (angles[2] < -threshold)
    user.updateView(user.pos, addV(user.pos, dvs[0]));
  else if (angles[2] > threshold)
    user.updateView(user.pos, addV(user.pos, dvs[1]));

  if (angles[1] < -threshold)
    user.updateView(user.pos, addV(user.pos, dvs[2]));
  else if (angles[1] > threshold)
    user.updateView(user.pos, addV(user.pos, dvs[3]));
};

sketch.touchStarted = function()
{
  last_down = [sketch.mouseX, sketch.mouseY];
  isDown = true;
};

sketch.touchEnded = function()
{
  if (event.type == "touchend" || (event.type == "mouseup" && (!sketch.deviceOrientation || sketch.deviceOrientation == "undefined")))
    isDown = false;
};

});

// accelerometer Data
window.addEventListener('deviceorientation', function(e)
{
  angles[0] = e.alpha;
  angles[1] = e.beta;
  angles[2] = e.gamma;
  for (let i = 0; i < 3; i++)
    if (!angles[i])
      angles[i]=0;
});
