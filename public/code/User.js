class User {
  constructor() {
    this.pos = [0, 0];
    this.vel = [0, 0];
  }
  zeroVel() {
    this.vel[0] = 0;
    this.vel[1] = 0;
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
  if (magSquared(vel) == 0) {
    sketch.ellipse(pos[0],pos[1],userStillRadius,userStillRadius);
    sketch.fill(0,150,0);
    sketch.ellipse(pos[0],pos[1],10,10);
  }
  else {
    let thetaStart = Math.atan(vel[1]/vel[0]); // note, its ok to divide by 0, atan(Infinity) = pi/2
    if ((vel[1] <= 0 && vel[0] <= 0) || (vel[0]<=0 && vel[1]>=0)){
      thetaStart += Math.PI;
    }
    sketch.arc(pos[0],pos[1],userMoveRadius,userMoveRadius,thetaStart-userMoveTheta,thetaStart+userMoveTheta);
    sketch.fill(0,0,150);
    let dPos = [-Math.cos(thetaStart)*userOffset, -Math.sin(thetaStart)*userOffset];
    sketch.ellipse(pos[0]+dPos[0],pos[1]+dPos[1],10,10);
  }
}
