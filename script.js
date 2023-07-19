const board = document.getElementById("board");
const board_ctx = board.getContext("2d");
const board_border = 'black';
const board_background = "black";
const snake_col = 'white';
    
let snake = [
  {x: 250, y: 250},
  {x: 240, y: 250},
  {x: 230, y: 250}
]

let score = 0;
let dx = 10;
let dy = 0; 

main();
gen_food();
document.addEventListener("keydown", change_direction);

function main() {
  if (endgame()) return;
  direction = false;
  setTimeout(function () {
    cboard();
    food();
    msnake();
    snaked();
    main();
  }, 50)
}
    
function cboard() {
  board_ctx.fillStyle = board_background;
  board_ctx.strokestyle = board_border;
  board_ctx.fillRect(0, 0, board.width, board.height);
  board_ctx.strokeRect(0, 0, board.width, board.height);
}
    
function snaked() {
  snake.forEach(snakedPart)
}



function food() {
  board_ctx.fillStyle = 'red';
  board_ctx.strokestyle = 'gray';
  board_ctx.fillRect(food_x, food_y, 10, 10);
  board_ctx.strokeRect(food_x, food_y, 10, 10);
}

function snakedPart(snakePart) {
  board_ctx.fillStyle = snake_col;
  board_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
}
    
function endgame() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > board.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > board.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food() {
  food_x = random_food(0, board.width - 10);
  food_y = random_food(0, board.height - 10);
  snake.forEach(function has_snake_eaten_food(part) {
    const eaten = part.x == food_x && part.y == food_y;
    if (eaten) gen_food();
  });
}

function change_direction(event) {
  const keyleft = 37;
  const keyright = 39;
  const keyup = 38;
  const keydown = 40;
    
  if (direction) return;
  direction = true;
  const keyPressed = event.keyCode;
  const up = dy === -10;
  const down = dy === 10;
  const right = dx === 10;
  const left = dx === -10;
  if (keyPressed === keyleft && !right) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === keyup && !down) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === keyright && !left) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === keydown && !up) {
    dx = 0;
    dy = 10;
  }
}

function msnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  const eaten = snake[0].x === food_x && snake[0].y === food_y;
  if (eaten) {
    score += 1;
    document.getElementById('score').innerHTML = score;
    gen_food();
  } 
  else {
    snake.pop();
  }
}
