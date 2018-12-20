function addV(a, b)
{
  let o = [];
  for (let i = 0; i < a.length; i++)
    o.push(a[i]+b[i]);
  return o;
}

function onCanvas(pos)
{
  let xIn = (pos[0] > 0 && pos[0] < screen_dims[0]);
  let yIn = (pos[1] > 0 && pos[1] < screen_dims[1]);
  return (xIn && yIn);
}

function magSquared(vec) {
  let s = 0;
  for (var i = 0; i < vec.length; i++) {
    s += vec[i]*vec[i];
  }
  return s;
}

function mag(vec) {
  return Math.sqrt(magSquared(vec));
}

function scalarMult(vec, k){
  let o = [];
  for (var i in vec) {
    o.push(k*vec[i]);
  }
  return o;
}

function rotateVec(vec, th) {
  return [vec[0]*Math.cos(th)-vec[1]*Math.sin(th), vec[0]*Math.sin(th)+vec[1]*Math.cos(th)];
}

function setMag(vec, magn) {
  if (magSquared(vec) == 0)
    return [0.1,0];
  else
    return scalarMult(vec, magn/mag(vec));
}
