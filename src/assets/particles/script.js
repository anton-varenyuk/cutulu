'use strict';


// Variables
var c = document.getElementById('canvas');
var ctx = c.getContext('2d');
var particles = {};
var particleIndex = 0;
var particleNum = 25;
var ch = c.height = window.innerHeight;
var cw = c.width = window.innerWidth;
var mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}


ctx.fillStyle = "black";
ctx.fillRect(0, 0, c.width, c.height);


// Event listener
addEventListener("mousemove", function(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  // console.log(mouse.x + "_" + mouse.y);
});

// Utility functions
function getDistance(x1, y1, x2, y2){
  var xD = x2 - x1;
  var yD = y2 - y1;

  return Math.sqrt(Math.pow(xD, 2) + Math.pow(yD, 2));
}

// Objects
var face = document.getElementById("face");
var circle1;

function Circle(x, y, radius, color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;

  this.update = function() {
    this.draw();
  }

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.drawImage(face, cw/2 - 50, ch/2 - 50, 100, 100);
  }
}

function init() {
  circle1 = new Circle(cw/2, ch/2, 50, 'transparent');
}

init();
///


function Particle() {
  this.x = mouse.x;
  this.y = mouse.y;

  this.vx = Math.random() * 10 - 5;
  this.vy = Math.random() * 5 - 5;
  particleIndex++;
  particles[particleIndex] = this;
  this.id = particleIndex;
  this.life = 0;
  this.maxLife = Math.random() * 10 + 100;
  this.gravity = 1;
  this.color = "rgba(255,190," + parseInt(Math.random()*255, 10) +  ",.7)";
}

Particle.prototype.draw = function() {
  this.x += this.vx;
  this.y += this.vy;
  this.vy += this.gravity;

  if (this.y > (ch-10)) {
      this.vx = Math.random() * -1 + 0.5;
      this.vy *= -0.2;
      this.y = ch-10;
      this.gravity *= 0.5;
  }
  if (this.x > cw-10 || this.x <= 0) {
      this.vx *= -0.6;
      this.gravity = 2;
  }
  if(getDistance(circle1.x, circle1.y, this.x, this.y) < circle1.radius + 10) {
    this.vx *= -0.5;
    this.vy =0;

      if (this.vy <= 0) {
        this.vy += 1.5;
      }
  }

  this.life++;
  if (this.life >= this.maxLife) {
    delete particles[this.id];
  }

  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, 3, 5);
}

setInterval(function() {
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, c.width, c.height);
  for (var i = 0; i < particleNum; i++) {
    new Particle();
  }
  ctx.globalCompositeOperation = "screen";
  for (var i in particles) {
    particles[i].draw();
  }
  circle1.update();
}, 30);
