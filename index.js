const grid = document.querySelector("#game");
const boardWidth = 560;
const boardHeight = 300;
const blockWidth = 150;
const blockHeight = 20;
const ballDiameter = 25;
let xDirection = -2;
let yDirection = 2;

let timerId;
const userStart = [205, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

// create Block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomleft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topleft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}
// all my blocks in array
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
];

// draw my blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomleft[0] + "px";
    block.style.bottom = blocks[i].bottomleft[1] + "px";
    grid.appendChild(block);
  }
}

addBlocks();

const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//draw the ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

document.addEventListener("keydown", moveUser);

function moveUser(event) {
  if (event.key === "ArrowLeft") {
    console.log(event.key + " key was pressed.");
    if (currentPosition[0] > 5) {
      currentPosition[0] -= 10;
    }
    drawUser();
  } else if (event.key === "ArrowRight") {
    console.log(event.key + " key  was pressed.");

    if (currentPosition[0] < 405) {
      currentPosition[0] += 10;
    }
    drawUser();
  }
}

// create a ball

const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// move the ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollision();
}

timerId = setInterval(moveBall, 10);

// check for collisions

function checkForCollision() {
  // block collision
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomleft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomleft[1] &&
      ballCurrentPosition[1] < blocks[i].topleft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      if(blocks.length === 0){
        clearInterval(timerId)
      }
    }
  }

  // check for user collision
if (
  ballCurrentPosition[0] + ballDiameter > currentPosition[0] &&
  ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
  ballCurrentPosition[1] + ballDiameter > currentPosition[1] &&
  ballCurrentPosition[1] < currentPosition[1] + blockHeight
) {
  changeDirection();
}

  // Wall collisions
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }
  // check for gameOver
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    console.log("Game Over");
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  } else if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  } else if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  } else if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
