// AUTHOR: Alek Westover
// thenight

// MAJOR NOTE: no more of this updating user view, UPDATE THE user pos!

let myp5 = new p5(function(sketch) {
let user;

sketch.setup = function()
{
  screen_dims = [sketch.windowWidth, sketch.windowHeight];
  canvas = sketch.createCanvas(screen_dims[0], screen_dims[1]);
  sketch.textAlign(sketch.CENTER);
  sketch.frameRate(10);

  socket = io.connect();
  socket.on('nameChosen', sketch.handleNameChosen);
  socket.on('gotData', sketch.handleGotData);

  user = new User();
}

sketch.draw = function() {
  sketch.background(0,0,0);
  sketch.translate(screen_dims[0]/2, screen_dims[1]/2);
  user.render(sketch);
  sketch.push();
  sketch.translate(user.pos[0], user.pos[1]);
  sketch.fill(0,0,0);
  sketch.ellipse(0,0,10,10);
  sketch.handleKeysDown();
  if(accelerometerWanted)
    sketch.handleTilted();
  sketch.pop();
}

sketch.handleGotData = function(data) {
  console.log(data);
}

sketch.handleNameChosen  = function(data) {
  console.log(data);
}

sketch.handleKeysDown = function() {
  let keyD = 30;
  if (sketch.keyIsDown(sketch.LEFT_ARROW) || sketch.keyIsDown(keyCodes['a']))
    user.updateView(user.pos, addV(user.pos, [keyD, 0]));
  else if (sketch.keyIsDown(sketch.RIGHT_ARROW) || sketch.keyIsDown(keyCodes['d']))
    user.updateView(user.pos, addV(user.pos, [-keyD, 0]));
  if (sketch.keyIsDown(sketch.UP_ARROW) || sketch.keyIsDown(keyCodes['w']))
    user.updateView(user.pos, addV(user.pos, [0, keyD]));
  else if (sketch.keyIsDown(sketch.DOWN_ARROW) || sketch.keyIsDown(keyCodes['s']))
    user.updateView(user.pos, addV(user.pos, [0, -keyD]));
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

});

// accelerometer Data
window.addEventListener('deviceorientation', function(e)
{
  angles[0] = e.alpha;
  angles[1] = e.beta;
  angles[2] = e.gamma;
  for (let i = 0; i < 3; i++)
  {
    if (!angles[i])
    {
      angles[i]=0;
    }
  }
});
