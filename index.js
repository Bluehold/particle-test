var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');

d = {};
var i = 0;
var p = 100;
var bgreset = 0;

class dots {
  constructor(x,y,motion,pr) {
    this.x = 800;
    this.y = 300;
    this.motion = [0,0];
    this.pr = 0;
  }
}

for (i = 0;i < p; i++) {
  d[i] = new dots();
  d[i].pr = 0.33 * (i % 3) + 0.01
}
for (var v in d) {
  if (Math.random() < 0.5) {
    while (true) {
    d[v].motion[0] = Math.random() * 20 - 10
    if (Math.random() < 0.5) {d[v].motion[1] = Math.sqrt(Math.random() * (100 - d[v].motion[0] ) - d[v].motion[0] ** 2)}
    else {d[v].motion[1] = -1 * Math.sqrt(Math.random() * (100 - d[v].motion[0] ) - d[v].motion[0] ** 2)}
    if (isNaN(d[v].motion[1]) == 0) break;
  }
  }
  else {
    while (true) {
      d[v].motion[1] = Math.random() * 20 - 10
      if (Math.random() < 0.5) {d[v].motion[0] = Math.sqrt(Math.random() * (100 - d[v].motion[1] ) - d[v].motion[1] ** 2)}
      else {d[v].motion[0] = -1 * Math.sqrt(Math.random() * (100 - d[v].motion[1] ) - d[v].motion[1] ** 2)}
      if (isNaN(d[v].motion[0]) == 0) break;
    }
  }
  
}

setInterval(function() {
  for (var v in d) {
    d[v].x += d[v].motion[0]
    d[v].y += d[v].motion[1]
    if (d[v].x < 0) d[v].motion[0] = -1 * d[v].motion[0]
    if (d[v].x > 1600) d[v].motion[0] = -1 * d[v].motion[0]
    if (d[v].y > 888 || (d[v].y < 0 && d[v].motion[1] < 0)) {
      d[v].motion[1] = -0.9 * d[v].motion[1]
      d[v].motion[0] = 0.9 * d[v].motion[0]
      if (Math.abs(d[v].motion[1]) < 0.01) d[v].motion[1] = 0;
    }
    if (!(d[v].motion[1] == 0))d[v].motion[1] += 0.1
  }

  c.fillStyle = '#36393F';
  c.globalAlpha = 1.0;
  c.fillRect(0,0,1600,900);
  c.globalAlpha = 1.0;
  c.lineWidth = 1;
  c.strokeStyle = '#FFF'
  for (var v in d) {
    c.beginPath();
    if (d[v].pr < 0.33) {
      c.fillStyle = '#08F'
      c.rect(d[v].x - 6, d[v].y - 6, 12, 12)
    }
    else if (d[v].pr < 0.66) {
      c.fillStyle = '#0F8'
      c.arc(d[v].x, d[v].y, 6, 0, Math.PI * 2)
    }
    else {
      c.fillStyle = '#F00'
      c.moveTo(d[v].x - 6, d[v].y + (2 * Math.sqrt(3)))
      c.lineTo(d[v].x + 6, d[v].y + (2 * Math.sqrt(3)))
      c.lineTo(d[v].x, d[v].y - (4 * Math.sqrt(3)))
      c.lineTo(d[v].x - 6, d[v].y + (2 * Math.sqrt(3)))
    }
    c.stroke();
    c.fill();
  }
},10)

keypress = {};
document.addEventListener('keydown', keyUp);
document.addEventListener('keyup', keyDown);
function keyUp(e) {
  keypress[e.keyCode] = true;
}
function keyDown(e) {
  keypress[e.keyCode] = false;
  
}