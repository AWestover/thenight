let socket;
let screen_dims;
let canvas;

let name;

let angles = [0,0,0];
let gridSize = 1500;
let accelerometerWanted = true;
let isDown = false;
let last_down = [0,0];
let maxDistSquared = 0;

const keyCodes = {"a":65, "d": 68, "s": 83, "w": 87};
const userSize = 100;
const userStillRadius = 200; // radius of circle when not moving
const userMoveRadius = 900; // radius of the sector shown when moving
const userMoveTheta = Math.PI/8; // cone is plus or minus this from angle

const terminalVelSquared = 4;
const terminalVel = Math.sqrt(terminalVelSquared);
const accelerationRate = 0.2;
const rotateRate = 0.05;

let dogTopPic;
