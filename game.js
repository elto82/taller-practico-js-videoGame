const canvas = document.querySelector("#game");
const game = canvas.getContext("2d");
const btonUp = document.querySelector('#up');
const btonLeft = document.querySelector('#left');
const btonRight = document.querySelector('#right');
const btonDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

window.addEventListener("load", setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize() {
  //game.fillRect(0,0,100,100);
  //game.clearRect(0,0,50,50);

  window.innerHeight > window.innerWidth
    ? (canvasSize = window.innerWidth * 0.8)
    : (canvasSize = window.innerHeight * 0.8);

  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);

  elementsSize = canvasSize / 10;

  startGame();
}

function startGame() {
  console.log({ canvasSize, elementsSize });

  game.font = elementsSize + "px Roboto";
  game.textAlign = "end";

  const map = maps[0];
  const mapRows = map.trim().split("\n");
  const mapRowCols = mapRows.map((row) => row.trim().split(""));
  console.log({ map, mapRows, mapRowCols });

  game.clearRect(0,0,canvasSize,canvasSize)

  /*   for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      game.fillText(emojis[mapRowCols[row - 1][col - 1]],
        elementsSize * col, elementsSize * row);      
    }
  } */
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if(col == 'O'){
        //console.log(posX, posY);
       if(!playerPosition.x && !playerPosition.y){
        playerPosition.x = posX;
        playerPosition.y = posY;
        console.log({playerPosition});
       }
      }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer (){
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

window.addEventListener('keydown', moveByKeys);
btonUp.addEventListener('click', moveUp);
btonLeft.addEventListener('click', moveLeft);
btonRight.addEventListener('click', moveRight);
btonDown.addEventListener('click', moveDown);

function moveByKeys(event){
  //console.log(event);
  if (event.key == 'ArrowUp') moveUp();
  if (event.key == 'ArrowLeft') moveLeft();
  if (event.key == 'ArrowRight') moveRight();
  if (event.key == 'ArrowDown') moveDown();
}

function moveUp(){
  console.log('arriba');
  playerPosition.y -= elementsSize
  startGame();
}
function moveLeft(){
  console.log('izquierda');
  playerPosition.x -= elementsSize
  startGame();
}
function moveRight(){
  console.log('derecha');
  playerPosition.x += elementsSize
  startGame();
}
function moveDown(){
  console.log('abajo');
  playerPosition.y += elementsSize
  startGame();
}

