'use strict';
import Game from './game.js';

let canvas = document.getElementById('gameScreen');
let ctx    = canvas.getContext('2d');

const GAME_WIDTH = 400;
const GAME_HEIGHT = 400;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
game.start();


let lastTime = 0;


function gameLoop(timeStamp) {

  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
