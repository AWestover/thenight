class User {
  constructor() {
    this.pos = [0, 0];
  }
  render(sketch) {
    sketch.fill(255,255,255);
    sketch.ellipse(-10,0,10,10);
    sketch.arc(0,0,500,500,-Math.PI/4,Math.PI/3)
  }
  updateView(last_pos, current_pos)
  {
    let proposedPos = addV([current_pos[0]-last_pos[0], current_pos[1] - last_pos[1]], this.pos);
    if((proposedPos[0] > -gridSize || this.pos[0] < proposedPos[0]) && (proposedPos[0] < gridSize || this.pos[0] > proposedPos[0]))
      this.pos[0] = proposedPos[0];
    if ((proposedPos[1] > -gridSize || this.pos[1] < proposedPos[1]) && (proposedPos[1] < gridSize || this.pos[1] > proposedPos[1]))
      this.pos[1] = proposedPos[1];
    console.log(this.pos);
  }
}
