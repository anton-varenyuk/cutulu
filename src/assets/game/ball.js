export default class Ball {

  constructor(game) {
    // this.image      = document.getElementById('man');
    this.image      = {
      lb: document.getElementById('manLB'),
      rb: document.getElementById('manRB'),
      lt: document.getElementById('manLT'),
      rt: document.getElementById('manRT')
    }

    this.gameWidth  = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.position   = {x: 10, y: 10};
    this.speed      = {x: 5, y: 5};
    this.size       = 100;

    this.game       = game;
  }

  draw(ctx) {
    if (this.speed.x > 0 && this.speed.y > 0 ){
        ctx.drawImage(this.image.rb, this.position.x, this.position.y, this.size, this.size);
    }
    if (this.speed.x > 0 && this.speed.y < 0 ){
        ctx.drawImage(this.image.rt, this.position.x, this.position.y, this.size, this.size);
    }
    if (this.speed.x < 0 && this.speed.y < 0 ){
        ctx.drawImage(this.image.lt, this.position.x, this.position.y, this.size, this.size);
    }
    if (this.speed.x < 0 && this.speed.y > 0 ){
        ctx.drawImage(this.image.lb, this.position.x, this.position.y, this.size, this.size);
    }
    // ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.position.x > this.gameWidth - this.size || this.position.x == 0) {
      this.speed.x = -this.speed.x;
    }

    if (this.position.y > this.gameHeight - this.size || this.position.y == 0) {
      this.speed.y = -this.speed.y;
    }

    let ballBot  = this.position.y + this.size;
    let padTop   = this.game.paddle.position.y;
    let padLeft  = this.game.paddle.position.x;
    let padRight = this.game.paddle.position.x + this.game.paddle.width;

    if (ballBot >= padTop
        && this.position.x >= padLeft
        && this.position.x + this.size <= padRight) {

       this.speed.y = -this.speed.y;
       this.position.y = this.game.paddle.position.y - this.size;
    }
  }

}
