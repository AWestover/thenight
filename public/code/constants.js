let socket;
let screen_dims;
let canvas;

let name;

let angles = [0,0,0];
let gridSize = 1500;
let accelerometerWanted = true;
let isDown = false;
let last_down = [0,0];

const keyCodes = {"a":65, "d": 68, "s": 83, "w": 87};
const userOffset = 10; // the user is this many units behind the sight cone
const userStillRadius = 200; // radius of circle when not moving
const userMoveRadius = 700; // radius of the sector shown when moving
const userMoveTheta = Math.PI/8; // cone is plus or minus this from angle
