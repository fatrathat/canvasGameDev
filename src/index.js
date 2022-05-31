const refs = {
  canvas: document.querySelector('#myCanvas'),
};

const brick = {
  brickRowCount: 3,
  brickColumnCount: 5,
  brickWidth: 75,
  brickHeight: 20,
  brickPadding: 10,
  brickOffsetTop: 30,
  brickOffsetLeft: 30,
};

const bricks = [];
for (let c = 0; c < brick.brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brick.brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

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
let score = 0;
let lives = 3;

// Отрисовка мяча
const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
};

// Отрисовка ракетки
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

//Отрисовка блоков
const drawBricks = () => {
  for (let c = 0; c < brick.brickColumnCount; c++) {
    for (let r = 0; r < brick.brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX =
          c * (brick.brickWidth + brick.brickPadding) + brick.brickOffsetLeft;
        let brickY =
          r * (brick.brickHeight + brick.brickPadding) + brick.brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brick.brickWidth, brick.brickHeight);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

//Обнаружение столкновения с блоком
const collisionDetection = () => {
  for (let c = 0; c < brick.brickColumnCount; c++) {
    for (let r = 0; r < brick.brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brick.brickWidth &&
          y > b.y &&
          y < b.y + brick.brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brick.brickRowCount * brick.brickColumnCount) {
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
};

//Отрисовка счета
const drawScore = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Score: ' + score, 8, 20);
};

//отрисовка жизней
const drawLives = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Lives: ' + lives, refs.canvas.width - 65, 20);
};

// Отрисовка полотна
const draw = () => {
  ctx.clearRect(0, 0, refs.canvas.width, refs.canvas.height);
  drawBall();
  drawPaddle();
  collisionDetection();
  drawScore();
  drawLives();
  drawBricks();

  if (x + dx > refs.canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > refs.canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
      } else {
        x = refs.canvas.width / 2;
        y = refs.canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (refs.canvas.width - paddleWidth) / 2;
      }
    }
  }

  x += dx;
  y += dy;

  if (rightPressed && paddleX < refs.canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  // requestAnimationFrame(draw);
};

const keyDownHandler = event => {
  if (event.keyCode == 39) {
    rightPressed = true;
  } else if (event.keyCode == 37) {
    leftPressed = true;
  }
};
const keyUpHandler = event => {
  if (event.keyCode == 39) {
    rightPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed = false;
  }
};
const mouseMoveHandler = event => {
  let relativeX = event.clientX - refs.canvas.offsetLeft;
  if (relativeX > 0 && relativeX < refs.canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
};

const interval = setInterval(draw, 10);

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);
document.addEventListener('mousemove', mouseMoveHandler);
