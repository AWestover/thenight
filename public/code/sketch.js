// AUTHOR: Alek Westover
// thenight

// MAJOR NOTE: no more of this updating user view, UPDATE THE user pos!

let myp5 = new p5(function(sketch) {
let user;
let playerData = {};
let rDots = [];

sketch.preload = function() {
  dogTopPic = sketch.loadImage("images/dogTop.png");
}

sketch.setup = function()
{
  screen_dims = [sketch.windowWidth, sketch.windowHeight];
  maxDistSquared = magSquared(screen_dims)/4;
  canvas = sketch.createCanvas(screen_dims[0], screen_dims[1]);
  sketch.textAlign(sketch.CENTER);
  sketch.frameRate(10);

  sketch.imageMode(sketch.CENTER); // SUPER IMPORTANT

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
  sketch.noStroke();
  sketch.push();
  sketch.translate(screen_dims[0]/2, screen_dims[1]/2);
  sketch.translate(-user.pos[0], -user.pos[1]);

  for(let unm in playerData) {
    if(unm != name)
      renderUser(sketch,playerData[unm].pos,playerData[unm].vel);
  }
  renderUser(sketch,user.pos,user.vel);

  if (magSquared(user.acc) != 0)
    user.addAcc();

  if (magSquared(user.vel) != 0)
    user.addVel();

  console.log(user.vel);

  sketch.fill(0,0,0);
  for (var i = 0; i < rDots.length; i++) {
    sketch.ellipse(rDots[i][0],rDots[i][1],10,10);
  }

  // process movement requests
  user.zeroAcc();
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
  if (sketch.keyIsDown(sketch.LEFT_ARROW) || sketch.keyIsDown(keyCodes['a']))
    user.vel = rotateVec(user.vel, -rotateRate);
  else if (sketch.keyIsDown(sketch.RIGHT_ARROW) || sketch.keyIsDown(keyCodes['d']))
    user.vel = rotateVec(user.vel, rotateRate);

  if (sketch.keyIsDown(sketch.UP_ARROW) || sketch.keyIsDown(keyCodes['w']))
    user.vel = setMag(user.vel, Math.min(mag(user.vel)+accelerationRate, terminalVel));
  else if (sketch.keyIsDown(sketch.DOWN_ARROW) || sketch.keyIsDown(keyCodes['s']))
    user.vel = setMag(user.vel, Math.max(0,mag(user.vel)-accelerationRate));
};

sketch.handleTilted = function()
{
  let threshold = 10;
  let tilted = false;
  if (sketch.deviceOrientation == "landscape")
    tilted = true;

  if ((angles[2] < -threshold && !tilted) || (angles[1] < -threshold && tilted))
    user.vel = rotateVec(user.vel, -rotateRate);
  else if ((angles[2] > threshold && !tilted) || (angles[1] > threshold && tilted))
    user.vel = rotateVec(user.vel, rotateRate);

  if ((angles[1] < -threshold && !tilted) || (angles[2] < -threshold && tilted))
    user.vel = setMag(user.vel, Math.min(mag(user.vel)+accelerationRate, terminalVel));
  else if ((angles[1] > threshold && !tilted) || (angles[2] > threshold && tilted))
    user.vel = setMag(user.vel, Math.max(0,mag(user.vel)-accelerationRate));
};

sketch.touchStarted = function()
{
  let tAcc = [sketch.mouseX - screen_dims[0]/2, sketch.mouseY - screen_dims[1]/2];
  let magMultiplier = Math.sqrt(terminalVelSquared / maxDistSquared);
  tAcc[0] = tAcc[0]*magMultiplier;
  tAcc[1] = tAcc[1]*magMultiplier;
  user.acc = tAcc;
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
