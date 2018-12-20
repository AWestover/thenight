class User {
  constructor() {
    this.pos = [0, 0];
    this.vel = [0, 0];
    this.acc = [0, 0];
  }
  zeroVel() {
    this.vel[0] = 0;
    this.vel[1] = 0;
  }
  zeroAcc() {
    this.acc[0] = 0;
    this.acc[1] = 0;
  }
  addVel() {
    this.pos = addV(this.pos, this.vel);
  }
  addAcc() {
    this.vel = addV(this.vel, this.acc);
    if (magSquared(this.vel) >= terminalVelSquared)
      this.vel = setMag(this.vel, terminalVel);
  }
  updateView(last_pos, current_pos)
  {
    this.vel = [last_pos[0]-current_pos[0], last_pos[1]-current_pos[1]];
    let proposedPos = addV(this.vel, this.pos);
    if((proposedPos[0] > -gridSize || this.pos[0] < proposedPos[0]) && (proposedPos[0] < gridSize || this.pos[0] > proposedPos[0]))
      this.pos[0] = proposedPos[0];
    if ((proposedPos[1] > -gridSize || this.pos[1] < proposedPos[1]) && (proposedPos[1] < gridSize || this.pos[1] > proposedPos[1]))
      this.pos[1] = proposedPos[1];
  }
}

function renderUser(sketch, pos, vel) {
  sketch.fill(255,255,255);
  let thetaStart = 0;
  if (magSquared(vel) == 0) {
    sketch.ellipse(pos[0],pos[1],userStillRadius,userStillRadius);
  }
  else {
    thetaStart = Math.atan(vel[1]/vel[0]); // note, its ok to divide by 0, atan(Infinity) = pi/2
    if (vel[0] < 0){
      thetaStart += Math.PI;
    }
    let dPos = [-Math.cos(thetaStart)*userSize, -Math.sin(thetaStart)*userSize];
    sketch.arc(pos[0]-dPos[0]/2,pos[1]-dPos[1]/2,userMoveRadius,userMoveRadius,thetaStart-userMoveTheta,thetaStart+userMoveTheta);
  }
  sketch.fill(0,0,150);
  sketch.push();
  sketch.translate(pos[0],pos[1]);
  sketch.rotate(thetaStart);
  sketch.image(dogTopPic,0,0,userSize,userSize);
  sketch.pop();
}
