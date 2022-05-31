const refs = {
  canvas: document.querySelector('#myCanvas'),
};
const ctx = refs.canvas.getContext('2d');
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 75;

let x = refs.canvas.width / 2;
let y = refs.canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleX = (refs.canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(
    paddleX,
    refs.canvas.height - paddleHeight,
    paddleWidth,
    paddleHeight
  );
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
};

const draw = () => {
  ctx.clearRect(0, 0, refs.canvas.width, refs.canvas.height);
  drawBall();
  drawPaddle();

  if (x + dx > refs.canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > refs.canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy;
  }

  x += dx;
  y += dy;
};
setInterval(draw, 10);
